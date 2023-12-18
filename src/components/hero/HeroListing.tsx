import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  NewspaperIcon,
  BeakerIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import { NewsTypes, ProjectTypes } from "@/types/ResponsesInterface";
import { removeAccentsAndSpaces } from "@/utils/utils";
import LinkUnderline from "../ui/LinkUnderline";

interface Props {
  heading: string;
  items: NewsTypes[] | ProjectTypes[];
  contentType: "News" | "Projects";
}

const HeroListing = ({ heading, contentType, items }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 851);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProjectClick = (item: ProjectTypes | NewsTypes) => {
    const projectSlug = removeAccentsAndSpaces(item.attributes.slug);
    if (contentType === "Projects") {
      router.push(`/research#${projectSlug}`).then(() => {
        window.scrollTo(0, 150);
      });
    }
  };

  return (
    <div className="w-full pb-12 lg:w-1/3 lg:pb-0">
      <h2>{heading}</h2>
      <ul className="padTop12 space-y-6">
        {items.map((item, i) => (
          <li key={i} className="group space-y-2">
            {contentType === "News" ? (
              <Link href="/news">
                <div className="flex items-center space-x-2 lg:space-x-6">
                  <NewspaperIcon className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />

                  <h4 className="duration-300 group-hover:text-orange">
                    {item.attributes.title}
                  </h4>
                </div>
                <p>{item.attributes.summary}</p>
              </Link>
            ) : (
              <>
                {isDesktop ? (
                  <div
                    onClick={() => handleProjectClick(item)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 lg:space-x-6">
                      <MagnifyingGlassCircleIcon className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />

                      <h4 className="duration-300 group-hover:text-orange">
                        {item.attributes.title}
                      </h4>
                    </div>
                    {/* <p>{item.attributes.summary}</p> */}
                  </div>
                ) : (
                  <Link
                    href={`/research#${removeAccentsAndSpaces(
                      item.attributes.slug
                    )}`}
                  >
                    <div className="flex items-center space-x-2 lg:space-x-6">
                      <MagnifyingGlassCircleIcon className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />

                      <h4 className="duration-300 group-hover:text-orange">
                        {item.attributes.title}
                      </h4>
                    </div>
                    {/* <p>{item.attributes.summary}</p> */}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
        {contentType === "News" ? (
          <li className="flex justify-end">
            <LinkUnderline path="/news">{t("allItems")}</LinkUnderline>
          </li>
        ) : (
          <li className="flex justify-end">
            <LinkUnderline path="/research">{t("allProjects")}</LinkUnderline>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HeroListing;
