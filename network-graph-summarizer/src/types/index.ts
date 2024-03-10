export interface Node {
    corpus_id: string;
    title: string;
    year: number;
    authors: string[];
    reference_count: number;
    citation_count: number;
    algorithm: null;
}

export interface Edge {
    edge_id: string;
    source_corpus: string;
    target_corpus: string;
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

export interface AuthorNode {
    author_id: string;
    name: string;
}

export interface AuthorEdge {
    edge_id: string;
    author_id: string;
    corpus_id: string;
}

export interface AuthorGraphData {
    nodes: AuthorNode[];
    edges: AuthorEdge[];
}

export interface BaseNode {
    data: {
        id: string;
        label: string;
        [key: string]: any;
    };
}

export interface BaseEdge {
    data: {
        id: string;
        source: string;
        target: string;
        [key: string]: any;
    };
}