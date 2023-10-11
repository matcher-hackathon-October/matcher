"use client";
import React, { useState } from "react";

interface Event {
  title: string;
  date: Date;
  location: string;
}

export default function CreateNewEventPage() {
  const [event, setEvent] = useState<Event>({
    title: "",
    date: new Date(),
    location: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can send the event data to your backend API or do any other logic you need
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={event.date.toISOString().substr(0, 10)}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Create Event</button>
    </form>
  );
}
