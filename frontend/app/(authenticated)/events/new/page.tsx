"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Event = {
  event_title: string;
  event_datetime: string;
  event_image: string;
  languages: number[];
  tags: number[];
  event_description: string;
};

const tags = [
  { id: 1, name: "React" },
  { id: 2, name: "Vue" },
];

const languages = [
  { id: 1, name: "日本語" },
  { id: 2, name: "English" },
];

function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div role="status" className={className}>
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

type CheckBoxGroupProps = {
  items: { id: number; name: string }[];
  itemColor?: string;
  selectedItems: number[];
  onChange: (items: number[]) => void;
  label: string;
  className?: string;
};

function CheckBoxGroup({
  items,
  itemColor = "bg-indigo-500",
  selectedItems,
  onChange,
  label,
  className,
}: CheckBoxGroupProps) {
  return (
    <div className={className}>
      <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={() => {
                if (selectedItems.includes(item.id)) {
                  onChange(selectedItems.filter((id) => id !== item.id));
                } else {
                  onChange([...selectedItems, item.id]);
                }
              }}
            />
            <span
              className={[
                selectedItems.includes(item.id)
                  ? [itemColor, "text-white"].join(" ")
                  : ["bg-gray-50", "text-gray-500"].join(" "),
                "text-gray-800 px-4 py-2 rounded-lg text-sm font-medium outline-none border-2 border-transparent transition duration-300",
              ].join(" ")}
            >
              {item.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function CreateNewEventPage() {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<Event> = (data) => {
    data.tags = selectedTags || [];
    data.languages = selectedLanguages || [];
    localStorage.setItem("formData", JSON.stringify(data));
    router.push("/events/confirm");
  };
  return (
    <>
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
            <Suspense
              fallback={
                <LoadingIndicator className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-10" />
              }
            >
              <CheckBoxGroup
                items={languages}
                itemColor="bg-green-500"
                selectedItems={selectedLanguages}
                onChange={setSelectedLanguages}
                label="言語"
                className="sm:col-span-2"
              />

              <CheckBoxGroup
                items={tags}
                itemColor="bg-orange-500"
                selectedItems={selectedTags}
                onChange={setSelectedTags}
                label="タグ"
                className="sm:col-span-2"
              />
            </Suspense>
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

            <p className="text-xs text-gray-400">
              By signing up to our newsletter you agree to our{" "}
              <a
                href="#"
                className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
