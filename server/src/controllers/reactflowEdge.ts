import Edge from "@/models/Edge";

//Update edges
export async function updateEdge(req, res){
    try {
        const data = req.body;
    if(!data || !data.length) return res.status(400).json({success: false, message: 'Provide edges to udpate'})


        const modifiedData = data.map(item => {
            const {id, source, target} = item
            return {id, source, target}
        })


            const bulkOps: any[] = [];
            modifiedData.forEach(edge => {
                bulkOps.push({
                  updateOne: {
                    filter: { id: edge.id }, // Match documents based on id
                    update: { $set: edge }, // Update with the entire node object
                    upsert: true, // Upsert for each operation
                  },
                });
              });
              const result = await Edge.collection.bulkWrite?.(bulkOps)

            if(!result) return res.status(500).json({success: false, message: 'Failed to add data!'})

        return res.status(200).json({success: true})

    } catch (error) {
        console.log('something went wrong', error)
        return res.status(500).json({success: false, error: 'Internal server error'});
    }
}

//Get Edges
export async function getEdges(req, res){
    try {
        const edges = await Edge.find()
        const modifiedEdges = edges.map(node => {
            const { __v, _id, ...rest } = node._doc; // Destructure __v and _id, keep the rest of the properties
            return { id: _id.toString(), ...rest}; // Rename _id to id and keep other properties
            });
        
            return res.status(200).json({success: true, data: modifiedEdges })
    } catch (error) {
        console.log('something went wrong', error)
        return res.status(500).json({error: 'Internal server error'});
    }
}