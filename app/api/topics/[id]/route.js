import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const {id} = params;
    // const id = req.nextUrl.searchParams.get("id");
    const { newtitle: title, newdescription: description } = await req.json();

    await connectMongoDB();
    await Topic.findByIdAndUpdate(id,{title,description})

    return NextResponse.json({message: "Topic Updated"}, {status: 200});
}

export async function GET(req, { params }) {
    const {id} = params;
    await connectMongoDB();

    const topic = await Topic.findOne({_id:id});

    return NextResponse.json({topic}, {status: 200});
}
