"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function BookingTable({
    bookings,
    setBookings,
    setEditData,
}) {
    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete?")) return;

        setBookings(bookings.filter((b) => b.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Seating</TableHead>
                        <TableHead>Request</TableHead>
                        <TableHead>Newsletter</TableHead>
                        <TableHead>Actions</TableHead>
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
                                <TableCell>{b.firstName} {b.lastName}</TableCell>
                                <TableCell>{b.phone}</TableCell>
                                <TableCell>{b.date}</TableCell>
                                <TableCell>{b.time}</TableCell>
                                <TableCell>{b.seating}</TableCell>
                                <TableCell>{b.request || "—"}</TableCell>
                                <TableCell>{b.newsletter ? "Yes" : "No"}</TableCell>

                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="outline"
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
    );
}