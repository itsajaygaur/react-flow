import { updateNode, getNodes, addNode, deleteNode } from "@/controllers/reactflowNode";
import { getEdges, updateEdge } from "@/controllers/reactflowEdge";
import { Router } from "express";


const router = Router()


//Reactflow Node routes
router.post('/update-node', updateNode)

router.post('/add-node', addNode )

router.get('/nodes', getNodes)

router.delete('/delete-node/:id', deleteNode)



//Reactflow Edge routes
router.post('/update-edge', updateEdge)

router.get('/edges', getEdges)

export default router