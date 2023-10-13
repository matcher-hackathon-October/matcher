import Loading from "@/app/(authenticated)/loading";
import { Suspense } from "react";

type CheckBoxGroupProps = {
  apiendpoint: string;
  itemColor?: string;
  selectedItems: number[];
  onChange: (items: number[]) => void;
  label: string;
  className?: string;
};

type CheckBoxItemsProps = {
  apiendpoint: string;
  selectedItems: number[];
  onChange: (items: number[]) => void;
  itemColor?: string;
};

async function getItems(apiendpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiendpoint}`);
  const json = await res.json();
  return json[apiendpoint.split("/").pop() as string];
}

async function CheckBoxItems({
  apiendpoint,
  selectedItems,
  onChange,
  itemColor = "bg-indigo-500",
}: CheckBoxItemsProps) {
  const items: Array<{ id: number; name: string }> = await getItems(
    apiendpoint
  );
  return (
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
  );
}

export default function CheckBoxGroup({
  apiendpoint,
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
      <Suspense
        fallback={
          <Loading className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        }
      >
        <CheckBoxItems
          {...{ apiendpoint, itemColor, selectedItems, onChange }}
        />
      </Suspense>
    </div>
  );
}
