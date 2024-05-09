import { authInstance } from "../config/axios";
import { Node, useReactFlow } from "reactflow";
import {useForm} from 'react-hook-form'
import { DataToUpdate, NodeData} from "../types/NodeType";
import { useEffect } from "react";

export default function NodeForm({data: nodeData}: {data?: Node}){

    const {setNodes} = useReactFlow()

    const { handleSubmit, register, reset, setValue, formState: {isSubmitting} } = useForm({
      defaultValues: {
        title: '',
        description: '',
        type: 'simple'
      }
    })

    useEffect(() => {
      if(!nodeData?.id) return
      setValue('title', nodeData?.data.label)
      setValue('description', nodeData?.data.description)
      setValue('type', nodeData?.type || 'simple')

    }, [nodeData])


  //Add node to database
  async function onSubmit(data: NodeData) {


    if(data.title.trim() === '') return
    try {

      const dataToUpdate: DataToUpdate = {
        type: data.type || "simple",
        position: { x: 200, y: 200 },
        data: { label: data.title },
      };

      if (!data.description || data.description.trim() !== "") {
        dataToUpdate.data.description = data.description.trim();
      }

      if(nodeData?.id){
        dataToUpdate.id = nodeData?.id
      }

      // return

      const response = await authInstance.post( nodeData?.id ? "/update-single-node" : "/add-node", dataToUpdate);
      const result = response.data
      if (!result.success) {
        alert(result.message || "something went wrong");
        return;
      }

      if (result.success) {
        setNodes((prev) => [...prev, result.data]);
        reset();
        (document.getElementById(nodeData?.id || "my_modal_2") as HTMLDialogElement)?.close();
        return;
      }
    } catch (error) {
      console.log("something went wrong!");
      alert("something went wrong!");
    }

    // setNodes(nds => [...nds, { id: title, type: type || '', position: { x: 200, y: 200 }, data: { label: title } }])
  }

    return(
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          {...register('title')}
          className="input input-bordered"
          placeholder="Title*"
          required
        />
        <input
        {...register('description')}
          className="input input-bordered"
          placeholder="Description"
        />

        <select {...register('type')} className="select select-bordered w-full " >
          <option value="simple">Simple node</option>
          <option value="email">Email</option>
          <option value="lead">Lead</option>
          <option value="delay">Wait</option>
        </select>

        <button disabled={isSubmitting} type="submit" className="btn">{ nodeData?.id ? "Update" : "Add"}</button>
      </form>
    )
}