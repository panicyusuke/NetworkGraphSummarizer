import React, { useState } from 'react';
import NetworkVisualization from './components/NetworkVisualization/NetworkVisualization';
import PaperSummary from './components/PaperSummary/PaperSummary';
import './App.css';

function App() {
    const [corpusId, setCorpusId] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // ここでAPIを呼び出すなどの処理を行う
        console.log('Submitted Corpus ID:', corpusId);
    };

    return (
        <div className="App">
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
                    <NetworkVisualization corpusId={corpusId} />
                    <PaperSummary />
                </div>
            </header>
        </div>
    );
}

export default App;