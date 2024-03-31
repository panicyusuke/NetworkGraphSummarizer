import React, {useEffect, useRef} from 'react';
import cytoscape, {LayoutOptions} from 'cytoscape';
import {PaperGraphData, PaperNode, CitationsEdge} from '../../types';
import './NetworkVisualization.css';


interface PaperNetworkVisualizationProps {
    graphData: PaperGraphData | null;
    onNodeClick: (node: cytoscape.NodeDataDefinition) => void;
    layout: LayoutName;
}

type LayoutName =
    | 'circle'
    | 'concentric'
    | 'breadthfirst'
    | 'grid'
    | 'random'
    | 'cose'
    | 'cola'
    | 'klay'
    | 'spread'
    | 'euler'
    | 'timeline';


const PaperNetworkVisualization: React.FC<PaperNetworkVisualizationProps> = ({graphData, onNodeClick, layout}) => {
        const cytoscapeRef = useRef<HTMLDivElement | null>(null);
        const cyRef = useRef<cytoscape.Core | null>(null);

        useEffect(() => {
            if (!graphData) return;


            if (cyRef.current) {
                cyRef.current.destroy();
            }

            const cy = cytoscape({
                container: cytoscapeRef.current,
                elements: [
                    ...graphData.nodes.map((node: PaperNode) => ({
                        data: {
                            id: node.corpus_id,
                            corpus_id: node.corpus_id,
                            title: node.title,
                            label: node.title,
                            citation_count: node.citation_count,
                            reference_count: node.reference_count,
                            year: node.year,
                            authors: node.authors.join(', '),
                        },
                    })),
                    ...graphData.edges.map((edge: CitationsEdge) => ({
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
                                const sizeRatio = citationCount / graphData.nodes.reduce((max, n) => Math.max(max, n.citation_count), 0);
                                return minSize + sizeRange * sizeRatio;
                            },
                            'height': (node: cytoscape.NodeSingular) => {
                                const citationCount = node.data('citation_count');
                                const minSize = 20;
                                const maxSize = 40;
                                const sizeRange = maxSize - minSize;
                                const sizeRatio = citationCount / graphData.nodes.reduce((max, n) => Math.max(max, n.citation_count), 0);
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
                    name: layout,
                    directed: true,
                    spacingFactor: 1.5,
                    animate: false,
                } as LayoutOptions,
            });

            cy.on('tap', 'node', (event) => {
                const node = event.target;
                onNodeClick(node.data());
            });

            cyRef.current = cy;


        }, [graphData, onNodeClick, layout]);

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
                <div ref={cytoscapeRef} className="network-visualization"/>
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
    }
;

export default PaperNetworkVisualization;
