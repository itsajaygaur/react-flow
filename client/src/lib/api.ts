import { Edge, Node } from "reactflow";
import { authInstance } from "../config/axios";


//update node
export async function updateNode(nodes: Node[]){
    try {
        if(!nodes || !nodes.length) return

      await authInstance.post('/update-node', nodes )

    } catch (error) {
      console.log('Something went wrong!', error)

    }
  }

//Update edge
  export async function updateEdge(edges: Edge[]){
    try {
      if(!edges || !edges.length) return
      await authInstance.post('/update-edge', edges)
    } catch (error) {
      console.log('Something went wrong!')
    }
  }


//Get all edges
  export async function getEdges(){
    try {
      const res = await authInstance.get('/edges')
      return res.data
    } catch (error) {
      console.log('Something went wrong!')
      return false
    }
  }

//Get all nodes
  export async function getNodes(){
    try {
      const res = await authInstance.get('/nodes')
      return res.data
    } catch (error) {
        console.log('Something went wrong!')
        return false
    }
  }

//Delete a node
  export default async function deleteNode(id: string){
    try {
        const res = await authInstance.delete('/delete-node/' + id)
        const data = res.data
        if(!data.success) return false
        return true
    } catch (error) {
        console.log('Something went wrong!')
        return false
    }
}


// check isAuthenticated

export async function checkAuth(){
    try {
        const result = await authInstance.post('/check-auth')
        if(!result.data.success) return false
        if(result.data.success) return true
    } catch (error) {
        console.log('Something went wrong')
        return false
    }
}