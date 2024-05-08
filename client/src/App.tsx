import './App.css'
import { FormEvent, useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Edge, Connection, Node, NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { FiPlus } from "react-icons/fi";
import EmailNode from './components/customNodes/EmailNode';
import LeadNode from './components/customNodes/LeadNode';
import DelayNode from './components/customNodes/DelayNode';
import SimpleNode from './components/customNodes/SimpleNode';
import { debounce } from './lib/utils';
import { useRef } from 'react';
// const initialNodes: Node[] = [
//   { id: '1', type: 'email', position: { x: 0, y: 0 }, data: { label: 'email' } },
//   { id: '2', type: 'simple', position: { x: 0, y: 100 }, data: { label: 'Sequence start point' } },
//   // { id: '3', type: 'lead', position: { x: 0, y: 180 }, data: { label: 'add people' } },
//   // { id: '4', type: 'delay', position: { x: 0, y: 280 }, data: { label: 'Wait' } },
// ];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes: any = {
  email: EmailNode,
  lead: LeadNode,
  delay: DelayNode,
  simple: SimpleNode
}

function App() {


  const formRef = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    
    
    try {
      const formData = new FormData(e.currentTarget)
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const type = formData.get('type') as string
      // const formObject = Object.fromEntries(formData.entries())

      // console.log('formbojeg ', formObject)
      if(!title?.trim()) return

      type DataToUpdate = {
        type: string;
        position: { x: number; y: number };
        data: { label: string; description?: string }; // Make description optional
    }

      const dataToUpdate: DataToUpdate = {
        type: type || 'simple',
        position: { x: 200, y: 200 },
        data: { label: title }
      }

      if (description && description.trim() !== '') {
        dataToUpdate.data.description = description.trim();
    }


      

      const res = await fetch('http://localhost:8000/api/v1/add-node', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToUpdate)
      })
      const data = await res.json()
      console.log('data -> ', data)
      setNodes(prev => [...prev, data.data])
      if(formRef.current){
        ;(formRef?.current as HTMLFormElement)?.reset()
      }
      ;(document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
      return

    } catch (error) {
      console.log('something went wrong!')
    }

    // setNodes(nds => [...nds, { id: title, type: type || '', position: { x: 200, y: 200 }, data: { label: title } }])



  }

  async function updateNode(){
    try {
      console.log('api call made')
      await fetch('http://localhost:8000/api/v1/update-node', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nodes)
      })
     

    } catch (error) {
      console.log('Something went wrong!', error)

    }
  }

  async function getNodes(){
    try {
      console.log('api call made')
      const res = await fetch('http://localhost:8000/api/v1/nodes')
      const data = await res.json()
      if(!data && !data.success) return 
      console.log('data received -> ', data)
      setNodes(data.data)
    } catch (error) {
      console.log('Something went wrong!')
    }
  }

async function getEdges(){
  try {
    const res = await fetch('http://localhost:8000/api/v1/edges')
    const data = await res.json()
    if(!data && !data.success) return
    setEdges(data.data)
  } catch (error) {
    console.log('Something went wrong!')
  }
}

async function updateEdge(){
  try {
    await fetch('http://localhost:8000/api/v1/update-edge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(edges)
    })
  } catch (error) {
    console.log('Something went wrong!')
  }
}


  const updateNodeDebounce = debounce(updateNode, 300)
  const updateEdgeDebounce = debounce(updateEdge, 300)

  useEffect(() => {

    updateNodeDebounce.invoke()
    return () => updateNodeDebounce.cancel()

  }, [nodes])

  useEffect(() => {
    updateEdgeDebounce.invoke()
    return () => updateEdgeDebounce.cancel()
  }, [edges])



  useEffect(() => {
    getNodes()
    getEdges()
  }, [])




  return (
    <div className='bg-gray-200 ' style={{ width: '100vw', height: '100vh' }}>
  
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // fitView
        
      >
    <div onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()} className='text-black absolute z-10 top-20 right-20 bg-white rounded-md shadow-md p-5 text-center cursor-pointer hover:shadow-lg' >
      <FiPlus size={22} className='mx-auto' />
     <p className='text-lg' > Add Lead Source </p>
      <p className='text-sm ' > Click to add leads from list or CRM</p>
    </div>
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box rounded-lg">

        <h2 className='text-xl mb-4 font-semibold' >Add new node</h2>
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4' >

          <input type="text" name='title' className='input input-bordered' placeholder='Title*' />
          <input type='text' name='description' className='input input-bordered' placeholder='Description' />

          <select className="select select-bordered w-full " name='type' >
            {/* <option disabled>Choose type</option> */}
            <option value="simple" >Simple node</option>
            <option value="email" >Email</option>
            <option value="lead" >Lead</option>
            <option value="delay" >Wait</option>
          </select>

          <button className='btn' >Add</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

      </ReactFlow>



    </div>
  )
}

export default App
