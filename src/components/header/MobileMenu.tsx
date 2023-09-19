import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import ThemeSwitch from "../ui/ThemeSwitch";
import Image from "next/image";
import { MenuType } from "src/types/MenuInterface";
import { MdMenu, MdClose } from "react-icons/md";

const MobileMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();
  let locale = router.locale ?? "en";

  const menu: MenuType = t("menu", { returnObjects: true });
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const [menuWidth, setMenuWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (menuRef.current) {
        setMenuWidth(menuRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuWidth]);
  return (
    <>
      <div className="relative flex items-center text-neutral-900 dark:text-neutral-100 lg:hidden">
        <nav className="ml-3 flex items-center space-x-3 lg:ml-4">
          <Link
            href={router.asPath}
            locale={router.locale === "en" ? "fr" : "en"}
            className=" text-sm lg:text-base"
          >
            <button aria-label="change language">
              <span
                className={`textHover ${
                  locale === "en" ? "underline underline-offset-2" : ""
                }`}
              >
                EN
              </span>{" "}
              /{" "}
              <span
                className={`textHover ${
                  locale === "fr" ? "underline underline-offset-2" : ""
                }`}
              >
                FR
              </span>
            </button>
          </Link>
          <ThemeSwitch />
          <button
            type="button"
            aria-label="change theme"
            className="textHover"
            onClick={() => setIsOpen(true)}
          >
            <MdMenu className="h-6 w-6 " />
          </button>
        </nav>
        <div
          ref={menuRef}
          className={`fixed right-0 top-0 h-full w-4/5  transform overflow-auto  bg-orange duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : `translate-x-full`
          } transition-transform`}
        >
          <div className=" bg-taupe absolute inset-0 -z-50 h-auto w-full"></div>
          <div className="flex justify-end">
            <button
              className="px-6 pt-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <MdClose className="h-6 w-6" />
            </button>
          </div>
          <div className="flex h-full flex-col justify-center space-y-6 px-12">
            <div className="">
              {menu.map((item, i) => {
                const isExternal = item.path.slice(0, 4) === "http";

                return (
                  <Link
                    key={i}
                    href={item.path}
                    rel={isExternal ? "noopener noreferrer" : ""}
                    target={isExternal ? "_blank" : ""}
                    className="textHover block px-4 py-2 text-xl "
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {/* <div className="border-t border-neutral-300 pt-6">
              {menu.map((item, i) => {
                const isExternal = item.path.slice(0, 4) === "http";

                return (
                  <Link
                    key={i}
                    href={item.path}
                    rel={isExternal ? "noopener noreferrer" : ""}
                    target={isExternal ? "_blank" : ""}
                    className="textHover block px-4 py-2 text-sm "
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
