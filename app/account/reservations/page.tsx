import bookingInterface from "@/app/_lib/types/bookingInterface";
import ReservationCard from "@/components/ReservationCard";
import { getBookings } from "@/app/_lib/api";
import { auth } from "@/app/_lib/auth";
import ReservationList from "@/components/ReservationList";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings: bookingInterface[] | any[] = await getBookings(
    session?.user?.guestId as any
  );
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
