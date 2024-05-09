import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { Node, useReactFlow } from "reactflow";
import deleteNode from "../lib/api";
import NodeForm from "./NodeForm";

export default function NodeAction({data} :{data: Node}){

    const {setNodes} = useReactFlow()

    async function handleDelete(){

        const result = await deleteNode(data.id)
        if(!result) return alert('Something went wrong!')
        setNodes(prev => prev.filter(node => node.id !== data.id))

    }


    return(
        <>
        <div className="absolute top-1 right-1 flex items-center gap-1" >

            <button onClick={() =>
            (
                document.getElementById(data.id) as HTMLDialogElement
            )?.showModal()
        } className="btn btn-circle  min-h-0 size-5  " >
                <MdOutlineModeEdit className="fill-blue-500" />
            </button>



            <button onClick={handleDelete} className="btn btn-circle  min-h-0 size-5  "  >
                <MdDeleteOutline className="fill-red-500" />
            </button>



        </div>

        <dialog id={data.id} className="modal">
            <div className="modal-box rounded-lg">
                <h2 className="text-xl mb-4 font-semibold">Update node</h2>
                <NodeForm data={data} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>

              </>
    )
}