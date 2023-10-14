"use client";

import Event from "@/components/Event";
import apiClient from "@/lib/apiClient";
import { EventData } from "@/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/events");
        console.log(response.data);
        setEvents(response.data.events);
      } catch (error) {
        alert("イベントの取得に失敗しました。");
      }
    };
    //fetchAPI
    // fetch("https://mock.apidog.com/m1/392795-0-default/events")
    //   .then((response) => response.json())
    //   .then((data) => setEvents(data.events))
    //   .catch((error) => console.error("Error fetching data: ", error));
    fetchEvents();
  }, []);

  return (
    <div className="relative">
      {events.map((event) => {
        const eventDate = new Date(event.event_datetime);
        const date = eventDate.toLocaleDateString();
        const time = eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        return (
          <Event
            key={event.event_id}
            id={event.event_id}
            image={event.event_image}
            date={date}
            title={event.event_title}
            time={time}
            venue={event.venue}
            currentParticipants={event.users.length}
            maxParticipants={event.max_participants}
          />
        );
      })}

      <Link href="/events/new">
        <PlusCircleIcon className="fixed bottom-32 right-10 h-14 w-14 text-slate-700" />
      </Link>
    </div>
  );
}
