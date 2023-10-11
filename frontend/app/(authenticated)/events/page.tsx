import EventOverview from "@/components/eventOverview";
import SearchForm from "@/components/form";
import { Suspense } from "react";

async function getEventlist() {
  const res = await fetch("https://mock.apidog.com/m1/392795-0-default/events");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const json = await res.json();
  return json.events;
}

async function EventsList() {
  const events = await getEventlist();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-hidden gap-5">
      {events.map((data) => (
        <EventOverview key={data.event_id} {...data} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="flex flex-col items-center justify-between px-3 pt-3 max-w-screen-md w-full mx-auto">
      <SearchForm className="w-full z-10 mb-5 sticky top-16" />
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList />
      </Suspense>
    </div>
  );
}
