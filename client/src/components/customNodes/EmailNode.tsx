import { MdOutlineEmail } from "react-icons/md";
import { Handle, Node, Position } from "reactflow";
import NodeAction from "../NodeAction";

export default function EmailNode(data: Node){



    return(
        <div className="p-5 pt-6 rounded-md shadow-sm border border-gray-300 bg-white relative" >

            <NodeAction data={data} />
            
           <div className="flex items-center gap-3" >
            <div className="border border-violet-600 bg-violet-100 rounded-sm p-1" >
                <MdOutlineEmail size={18} className="fill-violet-600" />
            </div>
            <div>
                <p className="font-semibold" > {data.data.label} </p>
                {data.data.description && <p className="text-xs text-violet-700" >{data.data.description}</p>}
           </div>
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
} 