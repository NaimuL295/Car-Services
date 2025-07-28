// import MyAllBookings from '@/components/tables/MyBookingsTable';
// import React, { useEffect, useState } from 'react';

// const MyBookingsPage = () => {
//     const [data,setData]=useState([]);
//     useEffect(()=>{
// const fetchData=async ()=>{
//     const res=await fetch(`http://localhost:3001/api/service/`)
//    const d= await res.json()
//    setData(d)
// }
//     },[])
//     return (
//         <div>
//             <MyAllBookings data={data}></MyAllBookings>
//         </div>
//     );
// };

// export default MyBookingsPage;
// "use client";
import MyAllBookingsTable from "@/components/tables/MyBookingsTable";
import { headers } from "next/headers";
import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

const fetchMyBookings = async () => {
  const res = await fetch(
    `http://localhost:3000/api/service`,
    {
      headers: new Headers(await headers()),
    }
  );
  const d = await res.json();
  //setData(d);
  return d;
};

export default async function MyBookingsPage() {
  const data = await fetchMyBookings();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetchMyBookings();
  // }, []);
  return (
    <div>
      <MyAllBookingsTable data={data} />
    </div>
  );
}