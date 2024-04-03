import React, {useEffect, useRef} from 'react';
import cytoscape, {LayoutOptions} from 'cytoscape';
import {AuthorGraphData} from '../../types';
import './NetworkVisualization.css';

interface AuthorNetworkVisualizationProps {
    graphData: AuthorGraphData | null;
    onAuthorClick: (author: any) => void;
    layout: LayoutName;
}

export type LayoutName =
    | 'circle'
    | 'concentric'
    | 'breadthfirst'
    | 'grid'
    | 'random'
    | 'cose'
    | 'cola'
    | 'klay'
    | 'spread'
    | 'euler';

const AuthorNetworkVisualization: React.FC<AuthorNetworkVisualizationProps> = ({graphData, onAuthorClick, layout}) => {
    const cytoscapeRef = useRef<HTMLDivElement | null>(null);
    const cyRef = useRef<cytoscape.Core | null>(null);

    useEffect(() => {
        if (!graphData) return;

        if (cyRef.current) {
            cyRef.current.destroy();
        }

        // ノードの大きさを正規化するための計算
        const citationCounts = graphData.nodes.map((node: any) => node.citation_count);
        const minCitationCount = Math.min(...citationCounts);
        const maxCitationCount = Math.max(...citationCounts);
        const nodeSizeRange = [20, 60]; // ノードの大きさの範囲

        // エッジの太さを正規化するための計算
        const edgeWeights = graphData.edges.map((edge: any) => edge.weight);
        const minEdgeWeight = Math.min(...edgeWeights);
        const maxEdgeWeight = Math.max(...edgeWeights);
        const edgeWidthRange = [2, 20]; // エッジの太さの範囲

        const cy = cytoscape({
            container: cytoscapeRef.current,
            elements: [
                ...graphData.nodes.map((node: any) => ({
                    data: {
                        id: node.author_id,
                        label: node.name,
                        type: 'author',
                        citation_count: node.citation_count,
                        paper_count: node.paper_count,
                    },
                })),
                ...graphData.edges.map((edge: any) => ({
                    data: {
                        id: edge.edge_id,
                        source: edge.from_author_id,
                        target: edge.to_author_id,
                        source_name: edge.from_author_name,
                        target_name: edge.to_author_name,
                        weight: edge.weight,
                    },
                })),
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': (node: any) => node.data('type') === 'author' ? '#5b9bd5' : '#ff6384',
                        'label': 'data(label)',
                        'color': '#fff',
                        'font-size': '25px',
                        'text-valign': 'center',
                        'text-halign': (node: any): 'left' | 'right' => {
                            const position = node.position();
                            return position.x < node.cy().width() / 2 ? 'left' : 'right';
                        },
                        'width': (node: any) => {
                            const paperCount = node.data('citation_count');
                            const normalizedSize = (paperCount - minCitationCount) / (maxCitationCount - minCitationCount);
                            return nodeSizeRange[0] + normalizedSize * (nodeSizeRange[1] - nodeSizeRange[0]);
                        },
                        'height': (node: any) => {
                            const paperCount = node.data('citation_count');
                            const normalizedSize = (paperCount - minCitationCount) / (maxCitationCount - minCitationCount);
                            return nodeSizeRange[0] + normalizedSize * (nodeSizeRange[1] - nodeSizeRange[0]);
                        },
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        'width': (edge: any) => {
                            const weight = edge.data('weight');
                            const normalizedWidth = (weight - minEdgeWeight) / (maxEdgeWeight - minEdgeWeight);
                            return edgeWidthRange[0] + normalizedWidth * (edgeWidthRange[1] - edgeWidthRange[0]);
                        },
                        'line-color': '#a6d1fa',
                        'target-arrow-color': '#a6d1fa',
                        'curve-style': 'bezier',
                    },
                },
            ],
            layout: {
                name: layout,
                directed: false,
                spacingFactor: 1.5,
                animate: false,
            } as LayoutOptions,
        });

        // 検索起点となったAuthorのノードを強調表示
        const searchedAuthorNode = cy.nodes(`[id = "${graphData.searched_author_id}"]`);
        searchedAuthorNode.style({
            'background-color': '#ff6384',
            'border-width': 5,
            'border-color': '#ff6384',
        });


        let selectedNode: any = null;
        let selectedEdge: any = null;


        cy.add([
            {
                group: 'nodes', data: {
                    id: 'anotationNode',
                    label: '__ノードの大きさ： 被引用数合計',
                },
                position: {x: cy.width() - 330, y: cy.height() + 130}
            }
        ]);
        cy.add([
            {
                group: 'nodes', data: {
                    id: 'anotationEdge',
                    label: ' __エッジの太さ： 著者間の累計引用回数',
                },
                position: {x: cy.width() - 330, y: cy.height() + 175}
            }
        ]);

        cy.on('tap', 'node[type = "author"]', (event) => {
            const node = event.target;

            console.log('Clicked node:', node.data());
            console.log('Searched author node:', searchedAuthorNode.data());

            onAuthorClick({
                id: node.data('id'),
                label: node.data('label'),
                paper_count: node.data('paper_count'),
                citation_count: node.data('citation_count'),
            });

            if (selectedNode) {
                selectedNode.style({
                    'background-color': '#5b9bd5',
                    'border-width': 0,
                });
            }

            if (selectedEdge) {
                selectedEdge.style({
                    'line-color': '#a6d1fa',
                    'target-arrow-color': '#a6d1fa',
                    'width': (edge: any) => {
                        const weight = edge.data('weight');
                        const normalizedWidth = (weight - minEdgeWeight) / (maxEdgeWeight - minEdgeWeight);
                        return edgeWidthRange[0] + normalizedWidth * (edgeWidthRange[1] - edgeWidthRange[0]);
                    },
                });
            }

            if (node.data('id') !== searchedAuthorNode.data('id')) {
                node.style({
                    'background-color': '#ffcd28',
                    'border-width': 5,
                    'border-color': '#ffcd28',
                });

                const edges = node.edgesWith(searchedAuthorNode);
                console.log('Edges between clicked node and searched author node:', edges.length);
                if (edges.length > 0) {
                    const edge = edges[0];
                    console.log('Selected edge:', edge.data());

                    edge.style({
                        'line-color': '#ffcd28',
                        'target-arrow-color': '#ffcd28',
                        'width': 10,
                    });

                    selectedNode = node;
                    selectedEdge = edge;

                    onAuthorClick({
                        ...node.data(),
                        weight: edge.data('weight'),
                    });
                } else {
                    console.log('No edge found between clicked node and searched author node');

                    selectedNode = node;
                    selectedEdge = null;

                    onAuthorClick({
                        ...node.data(),
                        weight: null,
                    });
                }
            }
        });

        // 背景色を修正
        const container = cy.container();
        if (container) {
            container.style.backgroundColor = '#0f337e'; // 背景色を薄い青色に設定
        }

        cyRef.current = cy;

    }, [graphData, onAuthorClick, layout]);

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
                <button onClick={handleZoomIn}>+</button>
                <button onClick={handleZoomOut}>-</button>
            </div>
            <div className="fit-control">
                <button onClick={handleFit}>Fit</button>
            </div>
        </div>
    );
};

export default AuthorNetworkVisualization;
