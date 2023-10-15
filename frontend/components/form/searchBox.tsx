"use client";

import apiClient from "@/lib/apiClient";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Categories, Languages, Tags, SearchEventProps } from "@/types";
import CheckBoxGroup from "@/components/form/checkBoxGroup";

export default function SearchBox({ className }: { className?: string }) {
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const [tags, setTags] = useState<Tags[]>([]);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchEventProps>();

  useEffect(() => {
    const fetchTags = apiClient.get("/tags");
    const fetchLanguages = apiClient.get("/languages");
    const fetchCategories = apiClient.get("/categories");

    Promise.all([fetchTags, fetchLanguages, fetchCategories]).then(
      ([tags, languages, categories]) => {
        setTags(tags.data["tags"]);
        setLanguages(languages.data["languages"]);
        setCategories(categories.data["categories"]);
      }
    );
  }, []);

  if (!tags || !languages || !categories) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<SearchEventProps> = (data) => {
    data.categories = selectedCategories;
    data.tags = selectedTags;
    data.languages = selectedLanguages;
    console.log(data);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassCircleIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="フリーワード検索"
            {...register("free_text")}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="pt-2 flex flex-wrap gap-2 justify-center items-center relative w-full">
        <div className="z-10">
          <button
            type="button" // 注意：こちらは"type=button"です
            className="mb-2"
            onClick={() => setAdvancedSearch(!advancedSearch)} // advancedSearchをトグル
          >
            {advancedSearch ? (
              <ChevronDoubleUpIcon className="w-5 h-5 text-black" />
            ) : (
              <ChevronDoubleDownIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
        {advancedSearch && (
          <div className="bg-slate-300 rounded-md absolute top-0 left-0">
            {Object.values({
              tags: {
                items: tags,
                selectedItems: selectedTags,
                onChange: setSelectedTags,
                label: "タグ",
                itemColor: "bg-orange-500",
              },
              languages: {
                items: languages,
                selectedItems: selectedLanguages,
                onChange: setSelectedLanguages,
                label: "言語",
                itemColor: "bg-green-500",
              },
              categories: {
                items: categories,
                selectedItems: selectedCategories,
                onChange: setSelectedCategories,
                label: "カテゴリー",
                itemColor: "bg-indigo-500",
              },
            }).map((group, index) => (
              <CheckBoxGroup
                key={index}
                {...group}
                className="sm:col-span-2 relative mx-5 py-4"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
