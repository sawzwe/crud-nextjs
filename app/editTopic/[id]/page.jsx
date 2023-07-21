import EditTopicForm from '@/components/EditTopicForm'
import axios from 'axios';


const APP_URL = process.env.NEXT_PUBLIC_APP_URL;


const getTopicById = async(id) =>{
  try {
    const response = await axios.get(`${APP_URL}/api/topics/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error loading topics:", error);
    return []; 
  }
}
async function page({params}) {
  const {id} = params;
  const {topic} = await getTopicById(id);
  // console.log(topic)

  const {title,description} = topic;
  return (
    <div>
      <EditTopicForm id = {id} title={title} description={description}/>
    </div>
  )
}

export default page
