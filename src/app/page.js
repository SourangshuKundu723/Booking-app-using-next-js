"use client";

import { useState } from "react";
import BookingForm from "@/components/BookingForm";
import BookingTable from "@/components/BookingTable";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [editData, setEditData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="flex justify-center aligns-center text-3xl font-bold mb-5">Booking App</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <BookingForm
          bookings={bookings}
          setBookings={setBookings}
          editData={editData}
          setEditData={setEditData}
        />

        <BookingTable
          bookings={bookings}
          setBookings={setBookings}
          setEditData={setEditData}
        />

      </div>
    </div>
  );
}