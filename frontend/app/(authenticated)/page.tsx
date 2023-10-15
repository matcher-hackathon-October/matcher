"use client";
import Slideshow from "@/components/slideshow/slideshow";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Event from "@/components/Event";
import { Suspense, useEffect, useState } from "react";
import { EventData } from "@/types";
import apiClient from "@/lib/apiClient";

async function EventList() {
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
    <>
      {events.map((event: EventData) => {
        const eventDate = new Date(event.event_datetime);
        const date = eventDate.toLocaleDateString();
        const time = eventDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <Event
            key={event.event_id}
            id={event.event_id}
            image={event.event_image}
            date={date}
            title={event.event_title}
            time={time}
            venue={event.venue}
            currentParticipants={event.users ? event.users.length : 0}
            maxParticipants={event.max_participants}
          />
        );
      })}
    </>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-5">
      <Slideshow>
        <div className="flex items-center text-2xl font-bold">
          <SparklesIcon className="h-6 w-6" /> {/* アイコン */}
          <span className="py-5">イチオシ記事</span>
          <SparklesIcon className="h-6 w-6" /> {/* アイコン */}
        </div>
      </Slideshow>
      <div className="w-full mx-auto">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6" /> {/* アイコン */}
          <span className="py-5 text-2xl font-bold">おすすめイベント</span>
          <SparklesIcon className="h-6 w-6" /> {/* アイコン */}
        </div>
        <div className="flex flex-wrap justify-center">
          <Suspense fallback={<div>loading...</div>}>
            <EventList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
