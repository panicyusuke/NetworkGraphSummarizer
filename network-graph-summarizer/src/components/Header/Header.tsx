import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header>
            <h1>論文ネットワーク分析ツール</h1>
            <p>このアプリケーションは、2億件の論文の中から論文・著者・引用ネットワークを抽出可視化し、Claude3に解釈させることで、効率的な論文調査を支援するためのツールです。</p>
        </header>
    );
};

export default Header;
