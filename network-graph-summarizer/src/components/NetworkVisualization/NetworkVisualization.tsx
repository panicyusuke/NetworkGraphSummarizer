import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GraphData } from '../../types';
import './NetworkVisualization.css';

interface NetworkVisualizationProps {
    corpusId: string;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ corpusId }) => {
    const cytoscapeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!corpusId) return;

            const response = await fetch(`https://paperspotter-staging.g-in.dev/v1/graph/search?corpus_id=${corpusId}`);
            const data: GraphData = await response.json();

            const cy = cytoscape({
                container: cytoscapeRef.current,
                elements: [
                    ...data.nodes.map((node) => ({
                        data: {id: node.corpus_id, label: node.title},
                    })),
                    ...data.edges.map((edge) => ({
                        data: {
                            id: edge.edge_id,
                            source: edge.source_corpus,
                            target: edge.target_corpus,
                        },
                    })),
                ],
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#5b9bd5',
                            'label': 'data(label)',
                            'text-wrap': 'ellipsis',
                            'text-max-width': '200px',
                            'color': '#fff',
                            'font-size': '14px',
                            'text-valign': 'center',
                            'text-halign': 'center',
                        },
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 2,
                            'line-color': '#a6d1fa',
                            'target-arrow-color': '#a6d1fa',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'background-fit': 'contain',
                            'background-repeat': 'repeat',
                        },
                    },
                ],
                layout: {
                    name: 'circle',
                    directed: true,
                    spacingFactor: 1.5,
                    animate: false,
                },
            });
            cy.layout({
                name: 'circle',
                directed: true,
                spacingFactor: 1.5,
                animate: false,
            }).run();
        };


        fetchData();
    }, [corpusId]);


    return <div ref={cytoscapeRef} className="network-visualization"/>;
};

export default NetworkVisualization;