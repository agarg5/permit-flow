import { useState } from "react";
import { IconDisplay } from "./icon-display";

export type SelectionProps<T> = {
  options: Record<string, string>;
  text?: string;
  multi?: boolean;
  onSelect: (selection: T | T[]) => void;
};
export function Selection<T>(props: SelectionProps<T>) {
  const [selections, setSelections] = useState<T[]>([]);

  return (
    <main>
      <div className="grid grid-cols-3 gap-7">
        {Object.entries(props.options).map(([tag, name]) => {
          const selected = selections.includes(tag as T);
          const onClick = () => {
            if (props.multi) {
              if (tag === "other") {
                props.onSelect([tag as T]);
              } else if (selected)
                setSelections(selections.filter((t) => t !== (tag as T)));
              else setSelections([...selections, tag as T]);
            } else props.onSelect(tag as T);
          };
          return (
            <IconDisplay
              key={tag}
              tag={tag}
              name={name}
              onClick={onClick}
              selected={selections.includes(tag as T)}
            />
          );
        })}
      </div>
      {props.multi && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.onSelect(selections as T[])}
        >
          Next
        </button>
      )}
    </main>
  );
}
