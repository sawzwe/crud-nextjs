"use client"
import React, {useState} from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function EditTopicForm({id,title,description}) {

  const [newtitle,setNewTitle] = useState(title);
  const [newdescription,setNewDescription] = useState(description);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      alert("Please fill all");
      return;
    }
  
    try {
      const res = await axios.put(`${APP_URL}/api/topics/${id}`, {
        newtitle,
        newdescription,
      });
  
      // if (res.status >= 200 && res.status < 300) {  
      if (res.data) {  
        // Successful request
        router.refresh();
        router.push("/");
        
      } else {
        throw new Error("Post failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder={newtitle}
          value={newtitle}
          onChange={(e)=>setNewTitle(e.target.value)}
        />
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder={newdescription}
          value={newdescription}
          onChange={(e)=>setNewDescription(e.target.value)}
        />
        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          {" "}
          Update Topic
        </button>
      </form>
    </div>
  );
}

export default EditTopicForm;
