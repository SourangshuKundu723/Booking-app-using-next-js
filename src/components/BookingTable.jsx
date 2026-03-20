"use client";

import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BookingTable({bookings, setBookings, setEditData}) {
    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete?")) return;
        setBookings(bookings.filter((b) => b.id !== id));
        toast.success("Booking deleted successfully!")
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Bookings</h2>

            <div className="max-h-96 overflow-y-auto border rounded-lg">
                
                <table className="w-full border-collapse">
                
                <thead className="sticky top-0 bg-white z-10">
                    <tr>
                    <th className="text-center p-2">Name</th>
                    <th className="text-center p-2">Phone</th>
                    <th className="text-center p-2">Date</th>
                    <th className="text-center p-2">Time</th>
                    <th className="text-center p-2">Seating</th>
                    <th className="text-center p-2">Request</th>
                    <th className="text-center p-2">Newsletter</th>
                    <th className="text-center p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="text-center p-4">
                        No bookings yet
                        </td>
                    </tr>
                    ) : (
                    bookings.map((b) => (
                        <tr key={b.id} className="border">
                        <td className="text-center p-2">{b.firstName} {b.lastName}</td>
                        <td className="text-center p-2">{b.phone}</td>
                        <td className="text-center p-2">{b.date}</td>
                        <td className="text-center p-2">{b.time}</td>
                        <td className="text-center p-2">{b.seating}</td>
                        <td className="text-center p-2">{b.request || "—"}</td>
                        <td className="text-center p-2">{b.newsletter ? "Yes" : "No"}</td>

                        <td className="text-center p-2 flex gap-2 justify-center">
                            <Button
                            variant="secondary"
                            onClick={() => setEditData(b)}
                            >
                            Edit
                            </Button>

                            <Button
                            variant="destructive"
                            onClick={() => handleDelete(b.id)}
                            >
                            Delete
                            </Button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>

                </table>
            </div>
            </div>
    );
}