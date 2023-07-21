import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";


const APP_URL = process.env.APP_URL;
// const getTopics= async() => {
//   try {
//     const response = await fetch(`${APP_URL}/api/topics`,{
//       cache: "no-store",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch topics");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error loading topics:", error);
//   }
// }

const getTopics = async () => {
  try {
    const response = await axios.get(`${APP_URL}/api/topics`, {
      headers: {
        "Cache-Control": "no-store", // Equivalent to cache: "no-store"
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error loading topics:", error);
    return []; 
  }
};


async function TopicsList() {

  const {topics} = await getTopics();
  console.log(topics)
  // console.log(APP_URL)
  return (
    
    <>
      {topics?.map((t)=>(
      <div className='p-4 border border-slate-3 my-3 flex justify-between gap-5 items-start'>
        <div>
            <h2 className='font-bold text-2xl'>{t.title}</h2>
            <div>{t.description}</div>
        </div>
        <div className='flex gap-2'>
          <RemoveBtn id={t._id}/>
          <Link href={`/editTopic/${t._id}`}>
            <HiPencilAlt size={24}/>
          </Link>
        </div>
      </div>
      ))}
    </>

  );
}

export default TopicsList;

