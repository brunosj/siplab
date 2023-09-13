import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ThemeSwitch from "./ui/ThemeSwitch";
import { useTheme } from "next-themes";
import { MenuType } from "src/types/MenuInterface";
import logo from "@/assets/siplab_logo.png";
import logoDark from "@/assets/siplab_logo_dark.png";
import Image from "next/image";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const menu: MenuType = t("menu", { returnObjects: true });

  return (
    <footer className="borderLight layout sectionPy bottom-0 w-full border-t">
      <div className="grid-cols-4 lg:grid">
        <div className="col-span-1 flex flex-col">
          {theme === "dark" ? (
            <Link className="w-16 pt-2 lg:w-24" href="/" aria-label="logo">
              <Image src={logoDark} alt="logo" />
            </Link>
          ) : (
            <Link className="w-16 pt-2 lg:w-24" href="/" aria-label="logo">
              <Image src={logo} alt="logo" />
            </Link>
          )}

          <p className="textPri  font-sec text-lg xl:block">
            {t("siteDescription")}
          </p>
        </div>
        <div className="col-span-3 grid-cols-3 justify-items-end pt-6 text-xs lg:pt-0 lg:text-sm xl:grid">
          <div>
            <h4 className="mb-2 lg:mb-4">Lab</h4>
            {[0, 1, 2, 4].map((index) => (
              <Link
                key={index}
                href={menu[index].path}
                className="textHover textPri mb-2 block cursor-pointer tracking-wide"
              >
                {menu[index].name}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-2 lg:mb-4">Outreach</h4>
            {menu.slice(2, 4).map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="textHover textPri mb-2 block cursor-pointer tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-2 lg:mb-4">Get in touch</h4>
            {menu.slice(5).map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="textHover textPri mb-2 block cursor-pointer tracking-wide "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
