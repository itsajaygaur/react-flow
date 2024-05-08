import Edge from '@/models/Edge';
import Node from '@/models/Node'
import mongoose from 'mongoose';


//Add node
export async function addNode(req, res){
    try {
        const data = req.body

        console.log('add ', data)
        if(!data) return res.status(400).json({success: false, message: 'Provide nodes to udpate'})
        
        const result = await Node.create(data)

        // console.log('restult -> ' , result)


            const { __v, _id, ...rest } = result._doc; // Destructure __v and _id, keep the rest of the properties
            const modifiedNode = { id: _id, ...rest}; // Rename _id to id and keep other properties
  

        return res.status(200).json({success: true, data: modifiedNode })


    } catch (error) {
        console.log(error)
    }
}



//Update node
export async function updateNode(req, res){
    try {
        const data = req.body;
        // console.log('data  ---> ', data)
        if(!data || !data.length) return res.status(400).json({success: false, message: 'Provide nodes to udpate'})
        //     const dataToUpdate = data.map(item => {
        //         const {id, type, position, data} = item
        //         return {id, type, position, data}
        // })

        const updatePromises = data.map(async item => {
            await Node.findByIdAndUpdate({_id: item.id}, item )
        })

        await Promise.all(updatePromises);

            // const bulkOps: any[] = [];
            // dataToUpdate.forEach(node => {
            //     bulkOps.push({
            //       updateOne: {
            //         filter: { _id: new mongoose.Types.ObjectId(node.id as string) }, // Match documents based on id
            //         update: { $set: node }, // Update with the entire node object
            //         upsert: true, // Upsert for each operation
            //       },
            //     });
            //   });
            //   const result = await Node.collection.bulkWrite?.(bulkOps)

            // if(!result) return res.status(401).json({success: false, message: 'Failed to add data!'})

        // const modifiedNodes = result.length && result.map(node => {
        //     const { __v, _id, ...rest } = node._doc; // Destructure __v and _id, keep the rest of the properties
        //     return { id: _id.toString(), ...rest }; // Rename _id to id and keep other properties
        //     });


            return res.json({success: true})
        



    } catch (error) {
        console.log('something went wrong', error)
        return res.status(500).json({error: 'Internal server error'});
    }
}


//Get all nodes
export async function getNodes(req, res){
    try {
        const data = await Node.find()
        if(!data) return res.status(400).json({success: false, message: 'Failed to get data'})

    const modifiedNodes = data.map(node => {
        const { __v, _id, ...rest } = node._doc; // Destructure __v and _id, keep the rest of the properties
        return { id: _id.toString(), ...rest}; // Rename _id to id and keep other properties
        });


        return res.status(200).json({success: true, data: modifiedNodes })
    } catch (error) {
        console.log('something went wrong', error)
        return res.status(500).json({error: 'Internal server error'});
    }
}


//Delete a node
export async function deleteNode(req, res){
    try {
        const {id} = req.params
        // console.log('id ', id)

        if(!id) return res.status(400).json({success: false, message: "Missing node id!"})

        const result = await Node.findByIdAndDelete(id)

        if(!result) return res.status(402).json({success: false, message: 'Failed to delete the node'})

        const deleteEdge = await Edge.deleteMany({$or: [{source: result.id}, {target: result.id}] })

        if(!deleteEdge) res.status(402).json({success: false, message: 'Failed to delete its edges'})

        res.status(200).json({success: true})
        
    } catch (error) {
        console.log('something went wrong', error)
        return res.status(500).json({error: 'Internal server error'});
    }
}