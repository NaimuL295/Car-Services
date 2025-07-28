
import { authOptions } from "@/lib/authOptions";
import { collectionNamesObj, dbConnect } from "@/lib/bdConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";





export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const bookingCollection = await dbConnect(collectionNamesObj.order); 
    const result = await bookingCollection
      .find({ email: session.user.email })
      .toArray();                         

    return NextResponse.json(result);
  }

  return NextResponse.json([]);
};




export const POST= async(req)=>{
   const body = await req.json()
  const orderCollection=await dbConnect(collectionNamesObj.order)
   const result=await orderCollection.insertOne(body)
   return NextResponse.json({result});
    
}