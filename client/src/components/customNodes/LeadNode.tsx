import { GoPersonAdd } from "react-icons/go";
import { Handle, Node, Position } from "reactflow";
import NodeAction from "../NodeAction";



export default function LeadNode(data: Node){


    return(
        <div className="p-5 pt-6 rounded-md shadow-sm border border-gray-300 bg-white relative" >
           

            <NodeAction data={data}  />

           <div className="flex items-center gap-3" >
            <div className="border border-pink-600 bg-pink-100 rounded-sm p-1" >
                <GoPersonAdd size={18} className="fill-pink-600" />
            </div>
            <div>
                <p className="font-semibold" > {data.data.label} </p>
                {data.data.description && <p className="text-xs text-pink-500" >{data.data.description}</p>}
           </div>
            </div>

             {/* <Handle type="target" position={Position.Top} /> */}
             <Handle type="source" position={Position.Bottom} />
        </div>
    )
} 