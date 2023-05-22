import Image from "next/image";

export type IconDisplayProps<T> = {
  name: string;
  tag: string;
  onClick?: () => void;
};

export function IconDisplay<T>(props: IconDisplayProps<T>) {
  return (
    <div>
      {props.name}
      <Image
        onClick={() => props.onClick?.()}
        alt={props.name}
        width={200}
        height={200}
        src={`/${props.tag}.svg`}
        className="cursor-pointer hover:border-indigo-300 border-2 mb-4"
      />
    </div>
  );
}
