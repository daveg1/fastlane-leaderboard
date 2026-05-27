import clsx from "clsx";

export interface DropdownOption {
  value: string;
  label?: string;
}

type Props = {
  label?: string;
  options: DropdownOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Dropdown(props: Props) {
  const { label, options, className, ...selectProps } = props;

  return (
    <label className="inline-flex items-baseline gap-4 px-4 py-2 text-white">
      {label ?? ""}{" "}
      <select
        className={clsx(
          "bg-transparent p-2 text-white focus:bg-slate-700",
          className,
        )}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    </label>
  );
}
