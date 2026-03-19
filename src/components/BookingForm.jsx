"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BookingForm({
    bookings,
    setBookings,
    editData,
    setEditData,
}) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        date: "",
        time: "",
        seating: "Indoor",
        request: "",
        newsletter: false,
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }
    }, [editData]);

    const handleSubmit = () => {
        if (!form.firstName || !form.phone) {
            alert("Please fill required fields");
            return;
        }

        if (editData) {
            const updated = bookings.map((b) =>
                b.id === editData.id ? { ...form, id: b.id } : b
            );
            setBookings(updated);
            setEditData(null);
        } else {
            setBookings([...bookings, { ...form, id: Date.now() }]);
        }

        // reset
        setForm({
            firstName: "",
            lastName: "",
            phone: "",
            date: "",
            time: "",
            seating: "Indoor",
            request: "",
            newsletter: false,
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

            <div className="space-y-4">

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">First Name</label>
                        <Input
                            placeholder="Enter first name"
                            value={form.firstName}
                            onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <Input
                            placeholder="Enter last name"
                            value={form.lastName}
                            onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                    />

                    <Input
                        type="time"
                        value={form.time}
                        onChange={(e) =>
                            setForm({ ...form, time: e.target.value })
                        }
                    />
                </div>

                {/* Seating */}
                <div>
                    <label className="text-sm font-medium">Seating Preference</label>
                    <div className="flex gap-4 mt-1">
                        <label>
                            <input
                                type="radio"
                                checked={form.seating === "Indoor"}
                                onChange={() =>
                                    setForm({ ...form, seating: "Indoor" })
                                }
                            />{" "}
                            Indoor
                        </label>

                        <label>
                            <input
                                type="radio"
                                checked={form.seating === "Outdoor"}
                                onChange={() =>
                                    setForm({ ...form, seating: "Outdoor" })
                                }
                            />{" "}
                            Outdoor
                        </label>
                    </div>
                </div>

                {/* Request */}
                <div>
                    <label className="text-sm font-medium">Additional Request</label>
                    <Textarea
                        placeholder="Enter request"
                        value={form.request}
                        onChange={(e) =>
                            setForm({ ...form, request: e.target.value })
                        }
                    />
                </div>

                {/* Newsletter */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.newsletter}
                        onChange={(e) =>
                            setForm({ ...form, newsletter: e.target.checked })
                        }
                    />
                    <span>Subscribe to newsletter</span>
                </div>

                {/* Button */}
                <Button className="w-full mt-4" onClick={handleSubmit}>
                    {editData ? "Update Booking" : "Request Booking"}
                </Button>

            </div>
        </div>
    );
}