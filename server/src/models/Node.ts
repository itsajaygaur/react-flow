import mongoose, { Document, Schema, Model } from 'mongoose';

interface DocumentResult<T> {
  _doc: any;
}

interface INode extends DocumentResult<INode> {
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

const nodeSchema: Schema<INode> = new Schema({
  type: {
    type: String,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data: {
    label: { type: String, required: true },
    description: {type: String}
  },
});

const Node: Model<INode> = mongoose.model<INode>('Node', nodeSchema);

export default Node;