import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface UIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const UIButton = ({ children, className, ...rest }: UIButtonProps) => {
  return (
    <button
      className={clsx(
        "flex whitespace-nowrap rounded-md bg-neutral-900 text-xs font-normal tracking-wide text-pri transition-all duration-300 hover:bg-orange dark:bg-orange hover:dark:bg-sec-dark",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-3 px-4 py-3">{children}</div>
    </button>
  );
};

export default UIButton;
