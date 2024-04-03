import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthorSummary.css';

interface AuthorSummaryProps {
    sourceAuthor: any | null;
    targetAuthor: any | null;
    edgeWeight: number | undefined;
}

const AuthorSummary: React.FC<AuthorSummaryProps> = ({sourceAuthor, targetAuthor, edgeWeight}) => {
    const navigate = useNavigate();

    const handleSourceAuthorPapersClick = () => {
        if (sourceAuthor) {
            navigate(`/author-wrote/${sourceAuthor.id}`);
        }
    };

    const handleTargetAuthorPapersClick = () => {
        if (targetAuthor) {
            navigate(`/author-wrote/${targetAuthor.id}`);
        }
    };

    return (
        <div>
            <div className="card-container">
                <div className="card">
                    <h3>○ 起点ノード</h3>
                    <p>著者ID: {sourceAuthor?.id || 'xxx'}</p>
                    <p>著者名: {sourceAuthor?.label || 'John Doe'}</p>
                    <p>執筆論文合計: {sourceAuthor?.paper_count || 0}</p>
                    <p>被引用数合計: {sourceAuthor?.citation_count || 0}</p>
                    <button onClick={handleSourceAuthorPapersClick}>この著者の論文を見る</button>
                </div>
                <div className="card">
                    <h3>↔ エッジ</h3>
                    <p>エッジ重み: {edgeWeight !== undefined ? edgeWeight : 0}</p>
                </div>
                <div className="card">
                    <h3>○ 対象ノード</h3>
                    <p>著者ID: {targetAuthor?.id || 'yyy'}</p>
                    <p>著者名: {targetAuthor?.label || 'Jane Smith'}</p>
                    <p>執筆論文合計: {targetAuthor?.paper_count || 0}</p>
                    <p>被引用数合計: {targetAuthor?.citation_count || 0}</p>
                    <button onClick={handleTargetAuthorPapersClick}>この著者の論文を見る</button>
                </div>
            </div>
        </div>
    );
};

export default AuthorSummary;
