import { collectionNamesObj, dbConnect } from "@/lib/bdConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const GET= async(req,{params})=>{
 const p=await params ;

 const bookingCollection = await dbConnect(collectionNamesObj.order)
  const query= {_id: new ObjectId(p.id)}


   
   const session = await getServerSession(authOptions)

  const email = session?.user?.email
    const singleBooking = await bookingCollection.findOne(query)
    const isOwnerOK = email === singleBooking?.email
    if (isOwnerOK) {
         return NextResponse.json(singleBooking);
    }
}

export const PATCH = async (req, { params }) => {
    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }

    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const currentBookingData = await bookingCollection.findOne(query)
    const isOwnerOK = email === currentBookingData?.email

    if (isOwnerOK) {
        const body = await req.json()

        const filter = {
            $set: { ...body }
        }

        const option = {
            upsert: true
        }
        const updateReponse = await bookingCollection.updateOne(query, filter, option)
        revalidatePath("/my-bookings")
        return NextResponse.json(updateReponse)
    }
    else {
        return NextResponse.json({ message: "Forbidden Update action" }, {
            status: 403
        })
    }

}
