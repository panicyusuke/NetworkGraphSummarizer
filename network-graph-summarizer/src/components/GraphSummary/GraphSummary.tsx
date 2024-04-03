import { AuthorGraphData } from '../../types';
import './GraphSummary.css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface GraphSummaryProps {
    graphData: AuthorGraphData | null;
    summaryRequested: boolean;

}

const GraphSummary: React.FC<GraphSummaryProps> = ({ graphData, summaryRequested }) => {
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchSummary = async () => {
            if (graphData && summaryRequested) {
                console.log('graphData:', graphData);
                const transformedData: Array<[string, string, number]> = graphData.edges.map((edge: any) => [
                    edge.from_author_name,
                    edge.to_author_name,
                    edge.weight,
                ]);

                const response = await fetch('http://localhost:8001/api/summarize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ graphData: transformedData }),
                });

                if (response.ok && response.body) {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    let result = '';

                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                const data = line.slice(5).trim();
                                if (data === '[DONE]') {
                                    break;
                                }
                                try {
                                    const parsedData = JSON.parse(data);
                                    if (parsedData.summary) {
                                        result = parsedData.summary;
                                        setSummary(result);
                                        console.log('New summary:', result);
                                    }
                                } catch (error) {
                                    console.error('Error parsing JSON:', error);
                                }
                            }
                        }
                    }
                } else {
                    console.error('Error fetching summary:', response.statusText);
                }
            }
        };

        fetchSummary();
    }, [graphData, summaryRequested]);

    return (
        <div className="graph-summary">
            {summary ? (
                <ReactMarkdown>{summary}</ReactMarkdown>
            ) : (
                <p>Loading summary...</p>
            )}
        </div>
    );
};

export default GraphSummary;
