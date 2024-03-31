import React from 'react';
import './PaperSummary.css';
import { PaperNode } from '../../types';

interface PaperSummaryProps {
    node: PaperNode;
}

const PaperSummary: React.FC<PaperSummaryProps> = ({ node }) => {
    return (
        <div className="paper-summary">
            <h2>Paper Summary</h2>
            {node ? (
                <>
                    <p>CorpusId: {node.corpus_id}</p>
                    <p>Title: {node.title}</p>
                    <p>Year: {node.year}</p>
                    <p>Authors: {node.authors}</p>
                    <p>Citation Count: {node.citation_count}</p>
                    <p>Reference Count: {node.reference_count}</p>
                </>
            ) : (
                <p>No paper selected.</p>
            )}
        </div>
    );
};

export default PaperSummary;