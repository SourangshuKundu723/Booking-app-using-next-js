"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function BookingForm({ bookings, setBookings, editData, setEditData }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        date: "",
        time: "",
        seating: "",
        request: "",
        newsletter: false,
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }
    }, [editData]);

    const handleSubmit = () => {
        const pattern = /^\d{10}$/;
        if (!form.firstName) {
            toast.warning("Please enter the first name!");
            return;
        }
        else if (!form.lastName) {
            toast.warning("Please enter the last name!");
            return;
        }
        else if (!form.phone || !pattern.test(form.phone)) {
            toast.warning("Please enter a valid 10 digit phone number!");
            return;
        }
        else if (!form.date) {
            toast.warning("Please select a date!");
            return;
        }
        else if (!form.time) {
            toast.warning("Please select time!");
            return;
        }
        else if (!form.seating) {
            toast.warning("Please select a seating preference!");
            return;
        }

        if (editData) {
            const updatedBookings = [];
            for (let i = 0; i < bookings.length; i++) {
                if (bookings[i].id === editData.id) {
                    updatedBookings.push({ ...form, id: editData.id });
                } else {
                    updatedBookings.push(bookings[i]);
                }
            }
            setBookings(updatedBookings);
            setEditData(null);
            toast.success("Booking updated successfully!")
        }
        else {
            const newBooking = { ...form, id: Date.now() };
            setBookings([...bookings, newBooking]);
            toast.success("Booking added successfully!")
        }

        setForm({
            firstName: "",
            lastName: "",
            phone: "",
            date: "",
            time: "",
            seating: "",
            request: "",
            newsletter: false,
        });
    };

    const handleCancel = () => {
        setEditData(null);

        setForm({
            firstName: "",
            lastName: "",
            phone: "",
            date: "",
            time: "",
            seating: "",
            request: "",
            newsletter: false,
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Booking Form</h2>

            <div className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">First Name<div className="inline-block text-red-600">*</div></label>
                        <Input
                            placeholder="Enter first name"
                            value={form.firstName}
                            onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Last Name<div className="inline-block text-red-600">*</div></label>
                        <Input
                            placeholder="Enter last name"
                            value={form.lastName}
                            onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Phone<div className="inline-block text-red-600">*</div></label>
                    <Input
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />
                </div>

                <label className="text-sm font-medium">Date & Time<div className="inline-block text-red-600">*</div></label>
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

                <div>
                    <label className="text-sm font-medium">Seating Preference<div className="inline-block text-red-600">*</div></label>
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

                <div className="flex justify-start">
                    <Button
                        className={`w-auto mt-4 ${editData ? "bg-yellow-400 hover:bg-yellow-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        onClick={handleSubmit}
                    >
                        {editData ? "Update Booking" : "Request Booking"}
                    </Button>

                    {editData ? (
                        <Button className="w-auto ms-2 mt-4" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                    ) : null}
                </div>

            </div>
        </div>
    );
}