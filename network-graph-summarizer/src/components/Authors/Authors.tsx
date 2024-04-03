import React, {useState} from 'react';
import AuthorSummary from '../AuthorSummary/AuthorSummary';
import AuthorNetworkVisualization from "../NetworkVisualization/AuthorNetworkVisualization";
import {AuthorGraphData, LayoutName} from '../../types';
import GraphSummary from "../GraphSummary/GraphSummary";
import './Authors.css';
import AuthorFilters from '../AuthorFilters/AuthorFilters';


const layouts: LayoutName[] = [
    'circle',
    'concentric',
    'breadthfirst',
    'grid',
    'random',
    'cose',
];


function Authors() {
    const [authorId, setAuthorId] = useState('152839559');
    const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
    const [selectedLayout, setSelectedLayout] = useState<LayoutName>('circle');
    const [authorGraphData, setAuthorGraphData] = useState<AuthorGraphData | null>(null);

    const handleSubmit = async () => {
        // event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/v1/graph/authors/search?author_id=${authorId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: AuthorGraphData = await response.json();
            setAuthorGraphData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAuthorClick = (author: any) => {
        console.log(author);
        setSelectedAuthor(author);
    };


    const [minPapers, setMinPapers] = useState(50);
    const [minCitations, setMinCitations] = useState(50);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

    return (
        <div>
            <AuthorFilters
                selectedLayout={selectedLayout}
                setSelectedLayout={setSelectedLayout}
                authorId={authorId}
                setAuthorId={setAuthorId}
                minPapers={minPapers}
                setMinPapers={setMinPapers}
                minCitations={minCitations}
                setMinCitations={setMinCitations}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                onSubmit={handleSubmit}
                layouts={layouts}
            />
            <div className="visualization-container">
                <AuthorNetworkVisualization
                    graphData={authorGraphData}
                    onAuthorClick={handleAuthorClick}
                    layout={selectedLayout}
                />
                <div className="summary-container">
                    <AuthorSummary author={selectedAuthor}/>
                    <GraphSummary graphData={authorGraphData}/>
                </div>
            </div>
        </div>
    );
}

export default Authors;
