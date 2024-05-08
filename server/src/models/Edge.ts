import mongoose, { Document, Schema, Model } from "mongoose";

interface DocumentResult<T> {
  _doc: any;
}

interface IEdge extends DocumentResult<IEdge> {
  id: string;
  source: { x: number; y: number };
  target: { label: string };
}

const edgeSchema: Schema<IEdge> = new Schema({
  id: { type: String },
  source: {
    type: String,
  },
  target: {
    type: String,
  },
});

const Edge: Model<IEdge> = mongoose.model<IEdge>("Edge", edgeSchema);

export default Edge;
