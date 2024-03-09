import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header-content">
                <h1 className="app-title">Network Graph Summarizer</h1>
                <p className="app-description">
                    このアプリケーションは、ネットワークグラフを視覚化し、論文の概要情報を提供します。
                </p>
            </div>
        </div>
    );
};

export default Header;