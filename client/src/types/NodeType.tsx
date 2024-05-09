export type NodeType = {
    id: string,
    position: {x: number, y: number},
    data: {label: string, description?: string}
}

export type DataToUpdate = {
    id?: string,
    type: string;
    position: { x: number; y: number };
    data: { label: string; description?: string }; // Make description optional
  };

export type NodeData = {
    title: string,
    description: string,
    type: string
}