import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Authors from './components/Authors/Authors';
import Citations from './components/Citations/Citations';
import Sidebar from './components/Sidebar/Sidebar';

import citationsImage from './images/citations.png';
import AuthorsImage from './images/authors.png';
import CoCiteImage from './images/co-cite.png';

function HomePage() {
    return (
        <div className="home-page">
            <h2>Paper Network Analytics へようこそ</h2>
            <p>
                本アプリは、研究論文の引用関係や著者のネットワークを探索し、知識の広がりを可視化します。
                以下の機能を提供しています：
            </p>
            <ul>
                <li>論文検索：論文の引用関係を時系列順にネットワーク可視化し、要約を表示します。</li>
                <li>著者検索：著者間の引用数をもとに円レイアウトでネットワークを可視化し、要約を表示します。</li>
                <li>共引用による類似論文検索：共通して引用されている論文を検索し、関連性の高い論文を発見できます。</li>
            </ul>
            <div className="card-container">
                <div className="card">
                    <h3>① 論文系譜可視化</h3>
                    <img src={citationsImage} alt="論文検索"/>
                    <div className="card-content">
                        <p>
                            論文の引用関係を時系列順にネットワーク可視化し、要約を表示します。
                            これにより、研究の流れや影響関係を一目で把握することができます。
                            気になる論文をクリックすると、詳細情報や要約を確認できます。
                        </p>
                        <Link to="/citations" className="button-style">論文系譜可視化ページへ</Link>
                    </div>
                </div>
                <div className="card">
                    <h3>② 著者検索</h3>
                    <img src={AuthorsImage} alt="著者検索"/>
                    <div className="card-content">
                        <p>
                            著者間の引用数をもとに円レイアウトでネットワークを可視化し、要約を表示します。
                            これにより、著者間の関係性や影響力を把握することができます。
                            著者をクリックすると、その著者の詳細情報や論文リストを確認できます。
                        </p>
                        <Link to="/authors" className="button-style">著者検索ページへ</Link>
                    </div>
                </div>
                <div className="card">
                    <h3>③ 共引用による類似論文検索</h3>
                    <img src={CoCiteImage} alt="共引用による類似論文検索"/>
                    <div className="card-content">
                        <p>
                            共通して引用されている論文を検索し、関連性の高い論文を発見できます。
                            これにより、特定の研究トピックに関連する論文を効率的に探すことができます。
                            検索結果から気になる論文をクリックすると、詳細情報や要約を確認できます。
                        </p>
                        <Link to="/authors" className="button-style">類似論文検索ページへ</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="main-content">
                    <Sidebar/>
                    <div className="page-content">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/citations" element={<Citations/>}/>
                            <Route path="/authors" element={<Authors/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
