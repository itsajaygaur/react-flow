import { updateNode, getNodes, addNode, deleteNode } from "@/controllers/reactflowNode";
import { getEdges, updateEdge } from "@/controllers/reactflowEdge";
import { Router } from "express";
import { login, register } from "@/controllers/auth.controller";
import { checkAuth } from "@/middleware/checkAuth";


const router = Router()


//Reactflow Node routes
router.post('/update-node', checkAuth, updateNode)

router.post('/add-node', checkAuth, addNode )

router.get('/nodes', checkAuth, getNodes)

router.delete('/delete-node/:id', deleteNode)



//Reactflow Edge routes
router.post('/update-edge', checkAuth, updateEdge)

router.get('/edges', checkAuth, getEdges)



//Auth routes
router.post('/register', register)
router.post('/login', login)

router.post('/check-auth', checkAuth, (req, res) => res.status(200).json({success: true, message: 'You are authenticated!'}) )

export default router