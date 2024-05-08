import mongoose, { Document, Schema, Model } from "mongoose";

interface DocumentResult<T> {
  _doc: any;
}

interface IEdge extends DocumentResult<IEdge> {
  id: string;
  source: { x: number; y: number };
  target: { label: string };
}

const nodeSchema: Schema<IEdge> = new Schema({
  id: { type: String },
  source: {
    type: String,
  },
  target: {
    type: String,
  },
});

const Edge: Model<IEdge> = mongoose.model<IEdge>("Edge", nodeSchema);

export default Edge;
