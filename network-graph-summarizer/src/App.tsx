import React, {useState} from 'react';
import Header from './components/Header/Header';
import PaperSummary from './components/PaperSummary/PaperSummary';
import AuthorSummary from './components/AuthorSummary/AuthorSummary';
import './App.css';
import PaperNetworkVisualization from "./components/NetworkVisualization/PaperNetworkVisualization";
import AuthorNetworkVisualization from "./components/NetworkVisualization/AuthorNetworkVisualization";
import {PaperGraphData, AuthorGraphData} from './types';
import GraphSummary from "./components/GraphSummary/GraphSummary";


const layouts = [
    'circle',
    'concentric',
    'breadthfirst',
    'grid',
    'random',
    'cose',
    'cola',
    'klay',
    'spread',
    'euler'
] as const;

type LayoutName = typeof layouts[number];

function App() {
    const [corpusId, setCorpusId] = useState('');
    const [authorId, setAuthorId] = useState('152839559');
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<any>(null); // 追加

    const [activeTab, setActiveTab] = useState('authors');
    const [selectedLayout, setSelectedLayout] = useState<LayoutName>('circle');
    const [paperGraphData, setPaperGraphData] = useState<PaperGraphData | null>(null);
    const [authorGraphData, setAuthorGraphData] = useState<AuthorGraphData | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (activeTab === 'citations') {
                const response = await fetch(`http://localhost:8000/v1/graph/papers/search?corpus_id=${corpusId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: PaperGraphData = await response.json();
                setPaperGraphData(data);
            } else {
                const response = await fetch(`http://localhost:8000/v1/graph/authors/search?author_id=${authorId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: AuthorGraphData = await response.json();
                setAuthorGraphData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNodeClick = (node: any) => {
        setSelectedNode(node);
    };

    const handleAuthorClick = (author: any) => {
        console.log(author);
        setSelectedAuthor(author);
    };

    const renderVisualization = () => {
        if (activeTab === 'citations') {
            return (
                <PaperNetworkVisualization
                    graphData={paperGraphData}
                    onNodeClick={handleNodeClick}
                    layout={selectedLayout}
                />
            );
        } else {
            return (
                <AuthorNetworkVisualization
                    graphData={authorGraphData}
                    onAuthorClick={handleAuthorClick}
                    layout={selectedLayout}
                />
            );
        }
    };

    return (
        <div className="App">
            <Header/>
            <header className="App-header">
                <div className="tab-container">
                    {['citations', 'authors'].map((tab) => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
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
                            value={activeTab === 'citations' ? corpusId : authorId}
                            onChange={(e) => activeTab === 'citations' ? setCorpusId(e.target.value) : setAuthorId(e.target.value)}
                            placeholder={activeTab === 'citations' ? "Enter Corpus ID" : "Enter Author ID"}
                            className="corpus-id-input"
                        />
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="visualization-container">
                    {renderVisualization()}
                    <div className="summary-container">
                        {activeTab === 'citations' ? (
                            <PaperSummary node={selectedNode}/>
                        ) : (
                            <>
                                <AuthorSummary author={selectedAuthor}/>
                                <GraphSummary graphData={authorGraphData}/>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
