"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import CheckBoxGroup from "@/components/form/checkBoxGroup";
import Loading from "../../loading";

type Event = {
  event_title: string;
  event_datetime: string;
  event_image: string;
  languages: number[];
  tags: number[];
  event_description: string;
};

export default function CreateNewEventPage() {
  console.log("CreateNewEventPage");
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Event>();

  useEffect(() => {
    const data = localStorage.getItem("formData");
    if (data) {
      const formData: Event = JSON.parse(data);
      setValue("event_title", formData.event_title);
      setValue("event_datetime", formData.event_datetime);
      setValue("event_image", formData.event_image);
      setValue("languages", formData.languages);
      setValue("event_description", formData.event_description);
      setSelectedLanguages(formData.languages);
      setSelectedTags(formData.tags);
    }
  }, [setValue]);

  useEffect(() => {
    const fetchTags = fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
    const fetchLanguages = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/languages`
    );
    Promise.all([fetchTags, fetchLanguages]).then(
      ([tags_res, languages_res]) => {
        tags_res.json().then((data) => {
          setTags(data.tags);
        });
        languages_res.json().then((data) => {
          setLanguages(data.languages);
        });
      }
    );
  }, []);

  if (!tags.length || !languages.length) return <Loading />;
  const onSubmit: SubmitHandler<Event> = (data) => {
    data.tags = selectedTags || [];
    data.languages = selectedLanguages || [];
    localStorage.setItem("formData", JSON.stringify(data));
    router.push("/events/confirm");
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 pb-24 relative">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            イベントを新規作成
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"></p>
        </div>

        <form
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              イベントタイトル*
            </label>
            <input
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              {...register("event_title", { required: true })}
            />
          </div>

          <div>
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              開催日時*
            </label>
            <input
              type="datetime-local"
              {...register("event_datetime", { required: true })}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              イベント写真
            </label>
            <input
              type="file"
              {...register("event_image")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <CheckBoxGroup
            items={languages}
            itemColor="bg-green-500"
            selectedItems={selectedLanguages}
            onChange={setSelectedLanguages}
            label="言語"
            className="sm:col-span-2 relative"
          />

          <CheckBoxGroup
            items={tags}
            itemColor="bg-orange-500"
            selectedItems={selectedTags}
            onChange={setSelectedTags}
            label="タグ"
            className="sm:col-span-2 relative"
          />

          <div className="sm:col-span-2">
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              イベント概要*
            </label>
            <textarea
              {...register("event_description", { required: true })}
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Send
            </button>

            <span className="text-sm text-gray-500">*Required</span>
          </div>
        </form>
      </div>
    </div>
  );
}
