import React from 'react';
import './PaperSummary.css';

interface PaperSummaryProps {
    node: any;
}

const PaperSummary: React.FC<PaperSummaryProps> = ({ node }) => {
    return (
        <div className="paper-summary">
            <h2>Paper Summary</h2>
            {node ? (
                <>
                    <p>Title: {node.label}</p>
                    {/* その他のノードの情報を表示 */}
                </>
            ) : (
                <p>No paper selected.</p>
            )}
        </div>
    );
};

export default PaperSummary;