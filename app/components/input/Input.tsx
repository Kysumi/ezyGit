import { forwardRef, HTMLProps, ReactElement } from "react";

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "label"> {
  id: string;
  error?: ReactElement | string | null;
  label?: ReactElement | string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium">
        {props.label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          ref={ref}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={`${props.id}-error`}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
        {props.error ? (
          <div className="pt-1 text-red-700" id={`${props.id}-error`}>
            {props.error}
          </div>
        ) : null}
      </div>
    </div>
  );
});
