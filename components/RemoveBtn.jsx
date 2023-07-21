'use client'
import React from 'react'
import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function RemoveBtn({id}) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure you want to remove');

    if (confirmed) {
      // const res = await fetch(`${APP_URL}/api/topics?id=${id}`,{
      //   method: 'DELETE'
      // })
      const res = await axios.delete(`${APP_URL}/api/topics?id=${id}`)
      // console.log(res)
    if (res.data){
      router.refresh()
    }
    
  }
}
  return (
    <button className="text-red-400">
        <HiOutlineTrash onClick={removeTopic} size={24}/>
    </button>
  )

}
export default RemoveBtn
