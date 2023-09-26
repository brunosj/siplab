import { MenuType } from "@/types/uiInterface";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const DesktopMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const menu: MenuType = t("menu", { returnObjects: true });

  return (
    <div className="hidden justify-between lg:flex ">
      <div className="flex gap-6 xl:gap-12">
        {menu.map((item, i) => (
          <div
            key={i}
            className={`textHover relative flex h-full items-center text-sm  ${
              router.asPath.startsWith(item.path)
                ? "after:content after:absolute   after:inset-x-0 after:-bottom-2 after:border-b-[4px] after:border-orange"
                : ""
            }`}
          >
            <Link key={i} href={item.path} className=" tracking-wide">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopMenu;
