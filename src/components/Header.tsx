import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import logo from "@/assets/siplab_logo.png";
import logoDark from "@/assets/siplab_logo_dark.png";
import ThemeSwitch from "./ui/ThemeSwitch";
import { useTheme } from "next-themes";
import Image from "next/image";
import { MenuType } from "@/types/MenuInterface";
import MobileMenu from "./header/MobileMenu";
import DesktopMenu from "./header/DesktopMenu";

const Header = () => {
  const router = useRouter();
  let locale = router.locale ?? "en";
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-pri shadow-sm dark:bg-pri-dark ">
      <div className="layout py-2 opacity-100 lg:opacity-90">
        <div className="flex items-center justify-between">
          {theme === "dark" ? (
            <Link className="w-16 pt-2 lg:w-20" href="/" aria-label="logo">
              <Image src={logoDark} alt="logo" />
            </Link>
          ) : (
            <Link className="w-16 pt-2 lg:w-20" href="/" aria-label="logo">
              <Image src={logo} alt="logo" />
            </Link>
          )}
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
