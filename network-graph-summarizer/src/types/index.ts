export interface PaperNode {
    corpus_id: string;
    title: string;
    year: number;
    authors: string[];
    reference_count: number;
    citation_count: number;
    algorithm: null;
}

export interface CitationsEdge {
    edge_id: string;
    source_corpus: string;
    target_corpus: string;
}

export interface PaperGraphData {
    nodes: PaperNode[];
    edges: CitationsEdge[];
}

export interface AuthorNode {
    author_id: string;
    name: string;
    paper_count: number;
    citation_count: number;
}

export interface AuthorEdge {
    edge_id: string;
    from_author_id: string;
    from_author_name: string;
    to_author_id: string;
    to_author_name: string;
}

export interface AuthorGraphData {
    nodes: AuthorNode[];
    edges: AuthorEdge[];
}
