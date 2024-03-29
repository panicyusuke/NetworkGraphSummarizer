import React, { useState } from 'react';
import NetworkVisualization from './components/NetworkVisualization/NetworkVisualization';
import Header from './components/Header/Header';
import PaperSummary from './components/PaperSummary/PaperSummary';
import './App.css';

function App() {
    const [corpusId, setCorpusId] = useState('');
    const [submitedCorpusId, setSubmitedCorpusId] = useState('');
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitedCorpusId(corpusId);
    };

    const handleNodeClick = (node: any) => {
        setSelectedNode(node);
    };

    return (
        <div className="App">
            <Header />
            <header className="App-header">
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
                <div className="visualization-container">
                    <NetworkVisualization corpusId={submitedCorpusId} onNodeClick={handleNodeClick} />
                    <PaperSummary node={selectedNode} />
                </div>
            </header>
        </div>
    );
}

export default App;