import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars4Icon } from "@heroicons/react/24/outline";
import logo from "@/assets/siplab_logo.png";
import ThemeSwitch from "./ui/ThemeSwitch";
import Image from "next/image";

import { MenuType } from "@/types/MenuInterface";
import MobileMenu from "./header/MobileMenu";
import DesktopMenu from "./header/DesktopMenu";
import clsx from "clsx";

const Header = () => {
  const router = useRouter();
  let locale = router.locale ?? "en";
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-pri shadow-sm dark:bg-pri-dark ">
      <div className="layout py-2 opacity-100 lg:opacity-90">
        <div className="flex items-center justify-between">
          <Link className="w-16 pt-2 lg:w-20" href="/" aria-label="logo">
            <Image src={logo} alt="logo" />
          </Link>
          <div className="h-auto max-h-full">
            <DesktopMenu />
          </div>
          <div className="hidden items-center space-x-6 lg:flex ">
            <Link
              href={router.asPath}
              locale={router.locale === "en" ? "fr" : "en"}
              className="textHover text-sm lg:text-base"
            >
              <button aria-label="change language">
                <span
                  className={`${
                    locale === "en" ? "underline underline-offset-2" : ""
                  }`}
                >
                  EN
                </span>{" "}
                /{" "}
                <span
                  className={`${
                    locale === "fr" ? "underline underline-offset-2" : ""
                  }`}
                >
                  FR
                </span>
              </button>
            </Link>
            <ThemeSwitch />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
