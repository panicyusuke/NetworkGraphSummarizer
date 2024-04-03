import React from 'react';
import './AuthorSummary.css';

interface AuthorSummaryProps {
    author: any | null;
}

const AuthorSummary: React.FC<AuthorSummaryProps> = ({author}) => {
    console.log(author);

    return (
        <div className="author-summary">
            <h2>執筆者概要</h2>
            {author ? (
                <>
                    <p>著者ID: {author.id}</p>
                    <p>著者名: {author.label}</p>
                    <p>執筆論文合計: {author.paper_count}</p>
                    <p>被引用数合計: {author.citation_count}</p>
                </>
            ) : (
                <>
                    <p>著者ID: xxx</p>
                    <p>著者名: xxx</p>
                    <p>執筆論文合計: 0</p>
                    <p>被引用数合計: 0</p>
                </>
            )}
        </div>
    );
};

export default AuthorSummary;
