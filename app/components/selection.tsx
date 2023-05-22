import { IconDisplay } from "./icon-display";

export type SelectionProps<T> = {
  onSelect: (key: T) => void;
  options: Record<string, string>;
  text?: string;
};
export function Selection<T>(props: SelectionProps<T>) {
  return (
    <main className="grid grid-cols-3 gap-7">
      {Object.entries(props.options).map(([tag, name]) => (
        <IconDisplay
          key={tag}
          tag={tag}
          name={name}
          onClick={() => props.onSelect(tag as T)}
        />
      ))}
    </main>
  );
}
