"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from "axios";


// const APP_URL = process.env.APP_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function page() {
  const [title,setTitle] = useState("") ;
  const [description,setDescription] = useState("")
  const router = useRouter();

  // console.log(APP_URL)

  // const handleSubmit = async (e) =>{
  //   e.preventDefault();
  //   if(!title || !description){
  //     alert("Please fill all");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(`${APP_URL}/api/topics`,{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ title, description})
  //     });

  //     if (!res.ok){
  //       throw new Error ("Post failed")
  //     }
  //     else{
  //       router.push('/')
  //     }
  //   } catch (error) {
  //     console.error(error)
      
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      alert("Please fill all");
      return;
    }
  
    try {
      const res = await axios.post(`${APP_URL}/api/topics`, {
        title,
        description,
      });
  
      // if (res.status >= 200 && res.status < 300) {  
      if (res.data) {  
        // Successful request
        router.push("/");
      } else {
        throw new Error("Post failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input 
        className='border border-slate-500 px-8 py-2' 
        type="text" 
        placeholder='Topic Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>

        <input className='border border-slate-500 px-8 py-2' 
        type="text" 
        placeholder='Topic Description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
    <button 
    type='submit' 
    className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>
       Add Topic
    </button>
    </form>



  )
}

export default page
