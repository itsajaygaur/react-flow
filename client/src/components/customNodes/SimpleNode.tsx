import { Handle, Node, Position } from "reactflow";
import NodeAction from "../NodeAction";

export default function SimpleNode(data: Node){

    
    return(
        <div className="px-5 pt-6 pb-4  rounded-md shadow-sm border border-gray-300 bg-white relative  " >

            <NodeAction data={data} />

           {/* <div className="flex items-center gap-3 "  > */}
                <p className="text-sm mb-2" >{data.data.label}</p>
                {data.data.description && <p className="text-xs" >{data.data.description}</p>}
            {/* </div> */}
            
            <Handle type="target" id="a" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
} 