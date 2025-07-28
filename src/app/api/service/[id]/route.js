
import { authOptions } from "@/lib/authOptions";
import { collectionNamesObj, dbConnect } from "@/lib/bdConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// export const POST=async(req,res)=>{
//     const servicesCollection
// }

export const DELETE = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  const id = params.id;

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const bookingCollection = await dbConnect(collectionNamesObj.order); // ✅ moved up
  const query = { _id: new ObjectId(id) };
  const currentBooking = await bookingCollection.findOne(query);

  if (!currentBooking) {
    return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
  }

  const isOwnerOk = session.user.email === currentBooking.email;

  if (isOwnerOk) {
    const deleteResp = await bookingCollection.deleteOne(query);
    return NextResponse.json({ success: true, deletedCount: deleteResp.deletedCount });
  } else {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }
};

export const GET = async (req, { params }) => {
    const p = await params;
    console.log(p,"back");
    
    const servicesCollection =await dbConnect(collectionNamesObj.text_services);
    const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

    return NextResponse.json(data);
}