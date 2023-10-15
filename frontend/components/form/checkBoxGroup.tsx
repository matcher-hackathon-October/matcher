type CheckBoxGroupProps = {
  items: Array<{ id: number; name: string }>;
  itemColor?: string;
  selectedItems: number[];
  onChange: (items: number[]) => void;
  label: string;
  className?: string;
};

type CheckBoxItemsProps = {
  items: Array<{ id: number; name: string }>;
  selectedItems: number[];
  onChange: (items: number[]) => void;
  itemColor?: string;
};

function CheckBoxItems({
  items,
  selectedItems,
  onChange,
  itemColor = "bg-indigo-500",
}: CheckBoxItemsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <label key={index} className="flex items-center space-x-2">
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
      <CheckBoxItems {...{ items, itemColor, selectedItems, onChange }} />
    </div>
  );
}
