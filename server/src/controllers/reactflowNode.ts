import Edge from "@/models/Edge";
import Node from "@/models/Node";

//Add node
export async function addNode(req, res) {
  try {
    const data = req.body;
    const {id} = req.user

    data.user = id

    if (!data)
      return res
        .status(400)
        .json({ success: false, message: "Provide nodes to udpate" });

    const result = await Node.create(data);

    // console.log('restult -> ' , result)

    const { __v, _id, ...rest } = result._doc; // Destructure __v and _id, keep the rest of the properties
    const modifiedNode = { id: _id, ...rest }; // Rename _id to id and keep other properties

    return res.status(200).json({ success: true, data: modifiedNode });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

//Update node
export async function updateNode(req, res) {
  try {
    const data = req.body;

    if (!data || !data.length)
      return res
        .status(400)
        .json({ success: false, message: "Provide nodes to udpate" });

    const updatePromises = data.map(async (item) => {
      await Node.findByIdAndUpdate({ _id: item.id }, item);
    });

    await Promise.all(updatePromises);

    return res.json({ success: true });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//Update single node
export async function updateSingleNode(req, res){
  try {
    const data = req.body;
    
    if (!data || !data.id)
      return res
    .status(400)
    .json({ success: false, message: "Provide nodes to udpate" });
    
    const {id, position, ...dataToUpdate} = data

    console.log('datatoupdate ', dataToUpdate)
    
    const result = await Node.findByIdAndUpdate({_id: id, user: req.user.id}, dataToUpdate, {returnDocument: 'after'} ) 
    
    if(!result) return res.status(500).json({success: false, message: 'Failed to update the node.'})

      // console.log('resultarup --> ', result)

      const { __v, _id, ...rest } = result._doc; // Destructure __v and _id, keep the rest of the properties
      const modifiedNode = { id: _id, ...rest }; // Rename _id to id and keep other properties

      return res.status(200).json({success: true, data: modifiedNode})

  } catch (error) {
    console.log('err' , error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
}

//Get all nodes
export async function getNodes(req, res) {
    try {
      const {id} = req.user



    const data = await Node.find({user: id})
    if (!data)
        return res
    .status(500)
    .json({ success: false, message: "Failed to get data" });
    


    const modifiedNodes = data.map((node) => {
      const { __v, _id, ...rest } = node._doc; // Destructure __v and _id, keep the rest of the properties
      return { id: _id.toString(), ...rest }; // Rename _id to id and keep other properties
    });

    return res.status(200).json({ success: true, data: modifiedNodes });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//Delete a node
export async function deleteNode(req, res) {
  try {
    const { id } = req.params;
    // console.log('id ', id)

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Missing node id!" });

    const result = await Node.findByIdAndDelete(id);

    if (!result)
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete the node" });

    const deleteEdge = await Edge.deleteMany({
      $or: [{ source: result.id }, { target: result.id }],
    });

    if (!deleteEdge)
      res
        .status(500)
        .json({ success: false, message: "Failed to delete its edges" });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
