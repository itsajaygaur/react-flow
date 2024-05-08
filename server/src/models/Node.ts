import mongoose, { Document, Schema, Model } from 'mongoose';

interface DocumentResult<T> {
  _doc: any;
}

interface INode extends DocumentResult<INode> {
  user: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

const nodeSchema: Schema<INode> = new Schema({
  user: {type: String, required: true},
  type: {
    type: String,
    required: true,
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