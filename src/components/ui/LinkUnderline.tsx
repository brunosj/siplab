import Link from "next/link";
import { Button } from "@/types/uiInterface";
import clsx from "clsx";

const LinkUnderline = ({ children, path }: Button) => {
  return (
    <button className="textUnderline flex whitespace-nowrap text-sm font-normal duration-300 lg:text-base">
      <>
        <Link
          href={path}
          className="flex items-center py-2"
          rel={path.includes("http") ? "noopener noreferrer" : ""}
          target={path.includes("http") ? "_blank" : "_self"}
        >
          <>{children}</>
        </Link>
      </>
    </button>
  );
};
export default LinkUnderline;
