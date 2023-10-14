"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/(authenticated)/loading";

type Event = {
  event_title: string;
  event_datetime: string;
  event_image: string;
  languages: number[];
  tags: number[];
  event_description: string;
};

export default function ConfirmationPage() {
  const [eventData, setEventData] = useState<Event | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("formData");
    if (data) {
      setEventData(JSON.parse(data));
    }
  }, []);

  if (!eventData) return <Loading />;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{eventData.event_title}</h2>
        <p className="text-gray-600 mb-4">
          <strong>Date & Time:</strong>{" "}
          {new Date(eventData.event_datetime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Languages:</strong> {eventData.languages.join(", ")}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Tags:</strong> {eventData.tags.join(", ")}
        </p>
        <p className="text-gray-600 mb-4">{eventData.event_description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Confirm
        </button>
      </div>
    </div>
  );
}
