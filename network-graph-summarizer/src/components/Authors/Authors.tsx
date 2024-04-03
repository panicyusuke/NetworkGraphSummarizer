import React, {useState, useEffect} from 'react';
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
    const [authorId, setAuthorId] = useState('2822260');
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
            data.searched_author_id = authorId;
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

    const [summaryRequested, setSummaryRequested] = useState(false);

    const handleSummaryRequest = () => {
        setSummaryRequested(true);
        console.log('summaryRequested updated:', true);
    };

    const [searchedAuthor, setSearchedAuthor] = useState<any | null>(null);

    useEffect(() => {
        if (authorGraphData) {
            const searchedAuthorNode = authorGraphData.nodes.find(
                (node: any) => node.author_id === authorGraphData.searched_author_id
            );
            if (searchedAuthorNode) {
                setSearchedAuthor({
                    id: searchedAuthorNode.author_id,
                    label: searchedAuthorNode.name,
                    paper_count: searchedAuthorNode.paper_count,
                    citation_count: searchedAuthorNode.citation_count,
                });
            }
        }
    }, [authorGraphData]);

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
                    <AuthorSummary
                        sourceAuthor={searchedAuthor}
                        targetAuthor={selectedAuthor}
                        edgeWeight={selectedAuthor?.weight}
                    />
                    <button className="graph-summarize-button" onClick={handleSummaryRequest} disabled={!authorGraphData}>
                        ネットワークグラフの要約
                    </button>
                    <GraphSummary graphData={authorGraphData} summaryRequested={summaryRequested}/>

                </div>
            </div>
        </div>
    );
}

export default Authors;
