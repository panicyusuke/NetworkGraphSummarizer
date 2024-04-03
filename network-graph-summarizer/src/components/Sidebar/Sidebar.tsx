import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className={`sidebar ${isOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="sidebar-icon">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <nav>
                <p> メニュー </p>
                <ul>
                    <li>
                        <Link to="/citations">① 論文系譜可視化</Link>
                    </li>
                    <li>
                        <Link to="/authors">② 累積引用回数</Link>
                    </li>
                    <li>
                        <Link to="/authors">② 共引用類似度検索</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
