
 import BookingUpdateForm from "@/components/forms/BookingUpdateForm";
import { headers } from "next/headers";
import React from "react";

export default async function UpdateBookingPage({ params }) {
  const p = await params;
  const res = await fetch(
    `http://localhost:3000/api/my-bookings/${p.id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  console.log(data ,"up");
  
  return (
    <div>
      <BookingUpdateForm data={data} />
    </div>
  );
}