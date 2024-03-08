import React from 'react';
import './PaperSummary.css';

const PaperSummary: React.FC = () => {
    return (
        <div className="paper-summary">
            <h2>Paper Summary</h2>
            <p>Title: Sample Paper Title</p>
            <p>Year: 2023</p>
            <p>Authors: John Doe, Jane Smith</p>
            <p>Reference Count: 10</p>
            <p>Citation Count: 5</p>
        </div>
    );
};

export default PaperSummary;