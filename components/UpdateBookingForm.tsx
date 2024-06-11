"use client";

import React from "react";
import { updateBooking } from "@/app/_lib/actions";
import bookingInterface from "@/app/_lib/types/bookingInterface";
import { useToast } from "@/components/ui/use-toast";
import cabinInterface from "@/app/_lib/types/cabinInterface";
import SubmitButton from "./SubmitButton";

export default function UpdateBookingForm({
  booking,
  cabin,
}: {
  booking: bookingInterface;
  cabin: cabinInterface;
}) {
  const { toast } = useToast();
  const { numGuests, observations, cabinId } = booking;
  const { maxCapacity } = cabin;
  const bookingId = booking.id;
  return (
    <form
      action={(data) =>
        updateBooking(data).then((res) => {
          toast({
            description: "Successfully updated reservation",
          });
        })
      }
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col rounded-lg"
    >
      <input type="hidden" name="bookingId" value={bookingId} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={maxCapacity}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton>Update Reservation</SubmitButton>
      </div>
    </form>
  );
}
