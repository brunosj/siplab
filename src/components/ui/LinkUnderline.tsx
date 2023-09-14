import Link from "next/link";
import { Button } from "@/types/uiInterface";
import clsx from "clsx";

const LinkUnderline = ({ children, path }: Button) => {
  const isExternal = path.slice(0, 4) === "http";

  return (
    <button className="textUnderline flex whitespace-nowrap text-sm font-normal duration-300 lg:text-base">
      <>
        {isExternal ? (
          <Link
            href={path}
            className="flex items-center py-2"
            rel="noopener noreferrer"
            target="_blank"
          >
            <>{children}</>
          </Link>
        ) : (
          <Link href={path} className="flex items-center  py-2">
            <>{children}</>
          </Link>
        )}
      </>
    </button>
  );
};
export default LinkUnderline;
