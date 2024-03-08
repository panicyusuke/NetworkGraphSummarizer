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