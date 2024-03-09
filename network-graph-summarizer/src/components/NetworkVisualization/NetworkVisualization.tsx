import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GraphData } from '../../types';
import './NetworkVisualization.css';

interface NetworkVisualizationProps {
    corpusId: string;
    onNodeClick: (node: cytoscape.NodeDataDefinition) => void;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ corpusId, onNodeClick }) => {
    const cytoscapeRef = useRef<HTMLDivElement | null>(null);
    const cyRef = useRef<cytoscape.Core | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!corpusId) return;

            const response = await fetch(`https://paperspotter-staging.g-in.dev/v1/graph/search?corpus_id=${corpusId}`);
            const data: GraphData = await response.json();

            if (cyRef.current) {
                cyRef.current.destroy();
            }

            const cy = cytoscape({
                container: cytoscapeRef.current,
                elements: [
                    ...data.nodes.map((node) => ({
                        data: { id: node.corpus_id, label: node.title, citation_count: node.citation_count },
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
                            'width': (node: cytoscape.NodeSingular) => {
                                const citationCount = node.data('citation_count');
                                const minSize = 20;
                                const maxSize = 40;
                                const sizeRange = maxSize - minSize;
                                const sizeRatio = citationCount / data.nodes.reduce((max, n) => Math.max(max, n.citation_count), 0);
                                return minSize + sizeRange * sizeRatio;
                            },
                            'height': (node: cytoscape.NodeSingular) => {
                                const citationCount = node.data('citation_count');
                                const minSize = 20;
                                const maxSize = 40;
                                const sizeRange = maxSize - minSize;
                                const sizeRatio = citationCount / data.nodes.reduce((max, n) => Math.max(max, n.citation_count), 0);
                                return minSize + sizeRange * sizeRatio;
                            },
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

            cy.on('tap', 'node', (event) => {
                const node = event.target;
                onNodeClick(node.data());
            });

            cyRef.current = cy;
        };

        fetchData();
    }, [corpusId, onNodeClick]);

    const handleZoomIn = () => {
        if (cyRef.current) {
            cyRef.current.zoom(cyRef.current.zoom() + 0.1);
        }
    };

    const handleZoomOut = () => {
        if (cyRef.current) {
            cyRef.current.zoom(cyRef.current.zoom() - 0.1);
        }
    };

    const handleFit = () => {
        if (cyRef.current) {
            cyRef.current.fit();
        }
    };

    return (
        <div>
            <div ref={cytoscapeRef} className="network-visualization" />
            <div className="controls">
                <div className="zoom-controls">
                    <button onClick={handleZoomIn}>+</button>
                    <button onClick={handleZoomOut}>-</button>
                </div>
                <div className="fit-control">
                    <button onClick={handleFit}>Fit</button>
                </div>
            </div>
        </div>
    );
};

export default NetworkVisualization;