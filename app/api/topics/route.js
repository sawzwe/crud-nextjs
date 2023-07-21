import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

export async function POST(req){
    const {title,description} = await req.json();
    await connectMongoDB();
    await Topic.create({title, description})

    return NextResponse.json({message: "Topic Created"}, {status: 201});

}

export async function GET(req){
    await connectMongoDB();
    const topics = await Topic.find()
    return NextResponse.json({topics});}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();

    await Topic.findByIdAndDelete(id);
    
    return NextResponse.json({message: "Topic Deleted"}, {status: 200});
}

// export async function PUT(req) {
//     const id = req.nextUrl.searchParams.get("id");
//     const { title, description } = await req.json();
  
//     await connectMongoDB();
  
//     try {
//       const updatedTopic = await Topic.findByIdAndUpdate(
//         id,
//         { title, description },
//         { new: true }
//       );
  
//       if (!updatedTopic) {
//         return NextResponse.json(
//           { message: "Topic not found with the given ID" },
//           { status: 404 }
//         );
//       }
  
//       return NextResponse.json({ updatedTopic }, { status: 200 });
//     } catch (error) {
//       return NextResponse.json(
//         { message: "Error updating topic", error: error.message },
//         { status: 500 }
//       );
//     }
//   }