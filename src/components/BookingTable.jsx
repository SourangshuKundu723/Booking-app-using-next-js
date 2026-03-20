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
            <div className="max-h-40 overflow-y-auto border rounded-lg">
            <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Phone</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Seating</TableHead>
                        <TableHead className="text-center">Request</TableHead>
                        <TableHead className="text-center">Newsletter</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                No bookings yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((b) => (
                            <TableRow key={b.id}>
                                <TableCell className="text-center">{b.firstName} {b.lastName}</TableCell>
                                <TableCell className="text-center">{b.phone}</TableCell>
                                <TableCell className="text-center">{b.date}</TableCell>
                                <TableCell className="text-center">{b.time}</TableCell>
                                <TableCell className="text-center">{b.seating}</TableCell>
                                <TableCell className="text-center">{b.request || "—"}</TableCell>
                                <TableCell className="text-center">{b.newsletter ? "Yes" : "No"}</TableCell>

                                <TableCell className="text-center flex gap-2">
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
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            </div>
        </div>
    );
}