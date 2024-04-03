import React, { useState } from 'react';
import PaperSummary from '../PaperSummary/PaperSummary';
import PaperNetworkVisualization from "../NetworkVisualization/PaperNetworkVisualization";
import { PaperGraphData } from '../../types';

const layouts = [
    'circle',
    'concentric',
    'breadthfirst',
    'grid',
    'random',
    'cose'
] as const;

type LayoutName = typeof layouts[number];

function Citations() {
    const [corpusId, setCorpusId] = useState('1111');
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [selectedLayout, setSelectedLayout] = useState<LayoutName>('breadthfirst');
    const [paperGraphData, setPaperGraphData] = useState<PaperGraphData | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/v1/graph/papers/search?corpus_id=${corpusId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: PaperGraphData = await response.json();
            setPaperGraphData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNodeClick = (node: any) => {
        setSelectedNode(node);
    };

    return (
        <div>
            <h3>Citations</h3>
            <div className="layout-container">
                <select
                    value={selectedLayout}
                    onChange={(e) => setSelectedLayout(e.target.value as LayoutName)}
                    className="layout-select"
                >
                    {layouts.map((layout) => (
                        <option key={layout} value={layout}>
                            {layout}
                        </option>
                    ))}
                </select>
                <form onSubmit={handleSubmit} className="corpus-id-form">
                    <input
                        type="text"
                        value={corpusId}
                        onChange={(e) => setCorpusId(e.target.value)}
                        placeholder="Enter Corpus ID"
                        className="corpus-id-input"
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
            <div className="visualization-container">
                <PaperNetworkVisualization
                    graphData={paperGraphData}
                    onNodeClick={handleNodeClick}
                    layout={selectedLayout}
                />
                <div className="summary-container">
                    <PaperSummary node={selectedNode} />
                </div>
            </div>
        </div>
    );
}

export default Citations;
