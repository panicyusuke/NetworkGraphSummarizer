import React from 'react';

const layouts = [
    'circle',
    'concentric',
    'breadthfirst',
    'grid',
    'random',
    'cose',
] as const;

type LayoutName = typeof layouts[number];

type Props = {
    selectedLayout: string;
    setSelectedLayout: (layout: LayoutName) => void;
    authorId: string;
    setAuthorId: (id: string) => void;
    minPapers: number;
    setMinPapers: (value: number) => void;
    minCitations: number;
    setMinCitations: (value: number) => void;
    selectedAlgorithm: string;
    setSelectedAlgorithm: (algorithm: string) => void;
    onSubmit: () => void;
    layouts: LayoutName[];
};

const AuthorFilters: React.FC<Props> = ({
    selectedLayout,
    setSelectedLayout,
    authorId,
    setAuthorId,
    minPapers,
    setMinPapers,
    minCitations,
    setMinCitations,
    selectedAlgorithm,
    setSelectedAlgorithm,
    onSubmit,
    layouts,
}) => {
    return (
        <div className="filter-container">
            <div className="filter-item">
                <label className="filter-label">Layout</label>
                <select
                    value={selectedLayout}
                    onChange={(e) => setSelectedLayout(e.target.value as LayoutName)}
                    className="filter-select"
                >
                    {layouts.map((layout) => (
                        <option key={layout} value={layout}>
                            {layout}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-item">
                <label className="filter-label">Author ID</label>
                <input
                    type="text"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    placeholder="Enter Author ID"
                    className="filter-input"
                />
            </div>
            <div className="filter-item">
                <label className="filter-label">Min Papers</label>
                <input
                    type="number"
                    value={minPapers}
                    onChange={(e) => setMinPapers(parseInt(e.target.value))}
                    placeholder="Minimum papers"
                    className="filter-input"
                />
            </div>
            <div className="filter-item">
                <label className="filter-label">Min Citations</label>
                <input
                    type="number"
                    value={minCitations}
                    onChange={(e) => setMinCitations(parseInt(e.target.value))}
                    placeholder="Minimum citations"
                    className="filter-input"
                />
            </div>
            <div className="filter-item">
                <label className="filter-label">Algorithm</label>
                <select
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Select an algorithm</option>
                    {/* アルゴリズムのオプションをここに追加 */}
                </select>
            </div>
            <button type="button" onClick={onSubmit} className="submit-button">
                Submit
            </button>
        </div>
    );
};

export default AuthorFilters;
