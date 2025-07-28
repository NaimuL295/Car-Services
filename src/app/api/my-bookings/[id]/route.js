import { collectionNamesObj, dbConnect } from "@/lib/bdConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"

export const GET= async(req,{params})=>{
 const p=await params ;

 const bookingCollection = await dbConnect(collectionNamesObj.order)
  const query= {_id: new ObjectId(p.id)}
 const singleBooking=await bookingCollection.findOne(query)
    return NextResponse.json(singleBooking);

}

export const PATCH = async (req, { params }) => {
  try {
    const body = await req.json();
    const p = params; 
    const bookingCollection = await dbConnect(collectionNamesObj.order);

    const query = { _id: new ObjectId(p.id) };
    const update = {
      $set: { ...body },
    };
    const options = { upsert: true };

    const updateResult = await bookingCollection.updateOne(query, update, options); 

    return NextResponse.json(updateResult);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }
};