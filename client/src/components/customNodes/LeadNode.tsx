import { NodeType } from "../../types/NodeType"
import { GoPersonAdd } from "react-icons/go";
import { Handle, Position } from "reactflow";
import { MdDeleteOutline } from "react-icons/md";
import { useReactFlow } from "reactflow";
import deleteNode from "../../lib/deleteNode";



export default function LeadNode(data: NodeType){

    const {setNodes} = useReactFlow()

    async function handleDelete(){

        const result = await deleteNode(data.id)
        if(!result) return console.log('Something went wrong!')
        setNodes(prev => prev.filter(node => node.id !== data.id))

    }

    return(
        <div className="p-5 rounded-md shadow-sm border border-gray-300 bg-white relative" >
            <button onClick={handleDelete} className="btn btn-circle absolute top-1 right-1 min-h-0 size-5  "  >
                <MdDeleteOutline className="fill-red-500" />
            </button>
           <div className="flex items-center gap-3" >
            <div className="border border-pink-600 bg-pink-100 rounded-sm p-1" >
                <GoPersonAdd size={18} className="fill-pink-600" />
            </div>
            <div>
                <p className="font-semibold" > {data.data.label} </p>
                {data.data.description && <p className="text-xs text-pink-500" >{data.data.description}</p>}
           </div>
            </div>

             <Handle type="target" position={Position.Top} />
             <Handle type="source" position={Position.Bottom} />
        </div>
    )
} 