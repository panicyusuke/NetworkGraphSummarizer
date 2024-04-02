import React from 'react';
import './AuthorSummary.css';

interface AuthorSummaryProps {
    author: any | null;
}

const AuthorSummary: React.FC<AuthorSummaryProps> = ({ author }) => {
    console.log(author);

    if (!author) {
        return <p>No author selected.</p>;
    }

    return (
        <div className="author-summary">
            <h2>Author Summary, Author ID: {author.id}, 著者名: {author.label}</h2>
            <p>執筆論文合計: {author.paper_count}</p>
            <p>被引用数合計: {author.citation_count}</p>
            <p>※ ノードの大きさ: 被引用数合計が大きいほど大きく</p>
            <p>※ エッジの太さ: 任意の2著者間における引用回数が多ければ多いほど</p>
        </div>
    );
};

export default AuthorSummary;
