import { useState } from "react";
import { IconDisplay } from "./icon-display";
import { OTHER_TAG } from "../helpers/types";

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
        {Object.entries(props.options).map(([currentTag, name]) => {
          const selected = selections.includes(currentTag as T);
          const onClick = () => {
            if (!props.multi) return props.onSelect(currentTag as T);

            props.onSelect([]); // reset
            const newSelections = [...selections, currentTag as T]
              .filter((t) =>
                currentTag === OTHER_TAG ? t === OTHER_TAG : t !== OTHER_TAG
              )
              .filter((t) => (selected ? t !== (currentTag as T) : true));
            setSelections(newSelections);
          };
          return (
            <IconDisplay
              key={currentTag}
              tag={currentTag}
              name={name}
              onClick={onClick}
              selected={selections.includes(currentTag as T)}
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
