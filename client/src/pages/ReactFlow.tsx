import { useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { FiPlus } from "react-icons/fi";
import EmailNode from "./../components/customNodes/EmailNode";
import LeadNode from "./../components/customNodes/LeadNode";
import DelayNode from "./../components/customNodes/DelayNode";
import SimpleNode from "./../components/customNodes/SimpleNode";
import { debounce } from "./../lib/utils";
import { getEdges, getNodes, updateEdge, updateNode } from "../lib/api";
import LogoutBtn from "../components/LogoutBtn";
import NodeForm from "../components/NodeForm";


const nodeTypes: any = {
  email: EmailNode,
  lead: LeadNode,
  delay: DelayNode,
  simple: SimpleNode,
};

export default function ReactFlowPage() {

  

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );



  //Populate edges after fetching from db
  async function populateEdges() {
    const result = await getEdges();
    if (!result) {
      alert("something went wrong");
    }
    // console.log("result", result);
    setEdges(result.data);
  }

  //Populate nodes after fetching from db
  async function populateNodes() {
    const result = await getNodes();
    if (!result) {
      alert("something went wrong");
    }
    // console.log("result", result);
    setNodes(result.data);
  }


  //Debouncing api calls on change of edges or nodes to avoid large number of network calls
  const updateNodeDebounce = debounce(updateNode, 300);
  const updateEdgeDebounce = debounce(updateEdge, 300);

  useEffect(() => {
    updateNodeDebounce.invoke(nodes);
    return () => updateNodeDebounce.cancel();
  }, [nodes]);

  useEffect(() => {
    updateEdgeDebounce.invoke(edges);
    return () => updateEdgeDebounce.cancel();
  }, [edges]);

  useEffect(() => {
    populateEdges();
    populateNodes();
  }, []);

  return (
    <div className="bg-gray-200 " style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // fitView
      >
        <Background />
        <Controls />
        <LogoutBtn />

        <div
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            )?.showModal()
          }
          className="text-black absolute z-10 top-20 right-20 bg-white rounded-md shadow-md p-5 text-center cursor-pointer hover:shadow-lg"
        >
          <FiPlus size={22} className="mx-auto" />
          <p className="text-lg"> Add Lead Source </p>
          <p className="text-sm "> Click to add leads from list or CRM</p>
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box rounded-lg">
            <h2 className="text-xl mb-4 font-semibold">Add new node</h2>
            <NodeForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </ReactFlow>
    </div>
  );
}
