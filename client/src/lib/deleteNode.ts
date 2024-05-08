export default async function deleteNode(id: string){
    try {
        const res = await fetch('http://localhost:8000/api/v1/delete-node/' + id,{
            method: 'DELETE'
        })
        const data = await res.json()
        if(!data.success) return false
        return true
    } catch (error) {
        console.log('Something went wrong!')
        return false
        
    }
}