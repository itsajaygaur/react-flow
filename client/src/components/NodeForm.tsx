import { useRef } from "react"
import { authInstance } from "../config/axios";
import { useReactFlow } from "reactflow";

export default function NodeForm(){

    const formRef = useRef(null)
    const {setNodes} = useReactFlow()

      //Add node to database
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const type = formData.get("type") as string;
      // const formObject = Object.fromEntries(formData.entries())

      // console.log('formbojeg ', formObject)
      if (!title?.trim()) return;

      type DataToUpdate = {
        type: string;
        position: { x: number; y: number };
        data: { label: string; description?: string }; // Make description optional
      };

      const dataToUpdate: DataToUpdate = {
        type: type || "simple",
        position: { x: 200, y: 200 },
        data: { label: title },
      };

      if (description && description.trim() !== "") {
        dataToUpdate.data.description = description.trim();
      }


      const res = await authInstance.post("/add-node", dataToUpdate);
      // console.log("data -> ", res.data);
      const data = res.data
      if (!data.success) {
        alert(data.message || "something went wrong");
        return;
      }

      if (data.success) {
        setNodes((prev) => [...prev, data.data]);
      }
      if (formRef.current) {
        (formRef?.current as HTMLFormElement)?.reset();
      }
      (document.getElementById("my_modal_2") as HTMLDialogElement)?.close();
      return;
    } catch (error) {
      console.log("something went wrong!");
      alert("something went wrong!");
    }

    // setNodes(nds => [...nds, { id: title, type: type || '', position: { x: 200, y: 200 }, data: { label: title } }])
  }

    return(
        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          className="input input-bordered"
          placeholder="Title*"
        />
        <input
          type="text"
          name="description"
          className="input input-bordered"
          placeholder="Description"
        />

        <select className="select select-bordered w-full " name="type">
          {/* <option disabled>Choose type</option> */}
          <option value="simple">Simple node</option>
          <option value="email">Email</option>
          <option value="lead">Lead</option>
          <option value="delay">Wait</option>
        </select>

        <button className="btn">Add</button>
      </form>
    )
}