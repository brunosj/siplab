import { PublicationTypes, TeamTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import { CMS_URL } from "src/lib/constants";
import Link from "next/link";
import { formatTeamPosition, formatPublicationType } from "@/utils/utils";
import LinkUnderline from "../ui/LinkUnderline";
import { useState } from "react";
import UIButton from "../ui/UIButton";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { removeAccentsAndSpaces } from "@/utils/utils";
import { Fade } from "react-awesome-reveal";

interface Props {
  item: TeamTypes;
  index: number;
  reverse?: boolean;
}

const TeamCard = ({ item, index, reverse }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const cardBg = reverse
    ? index % 2 !== 0
      ? "bg-pri dark:bg-pri-dark"
      : "bg-sec dark:bg-pri-darker"
    : index % 2 === 0
    ? "bg-pri dark:bg-pri-dark"
    : "bg-sec dark:bg-pri-darker";

  // Combine and sort publications
  const allPublications: PublicationTypes[] = [
    ...item.attributes.publications.data,
    ...item.attributes.otherPublications.map((other) => ({
      attributes: {
        title: other.title,
        reference: other.title,
        link: other.link,
        type: other.type,
        date: other.date,
      },
    })),
  ];

  // Group publications by type
  const groupedPublications: Record<string, PublicationTypes[]> = {};

  allPublications.forEach((publication) => {
    const type = formatPublicationType(
      publication.attributes.type,
      locale
    ).toLowerCase();
    if (!groupedPublications[type]) {
      groupedPublications[type] = [];
    }
    groupedPublications[type].push(publication);
  });

  // Sort the combined publications by title A-Z
  const publicationsSorted = Object.keys(groupedPublications)
    .sort((a, b) => {
      if (a.toLowerCase() === "other" || a.toLowerCase() === "autre") {
        return 1;
      }
      if (b.toLowerCase() === "other" || b.toLowerCase() === "autre") {
        return -1;
      }
      return a.localeCompare(b);
    })
    .map((type) => ({
      type,
      publications: groupedPublications[type].sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      ),
    }));

  const [showAllPublications, setShowAllPublications] =
    useState<boolean>(false);

  const totalDisplayedPublications = showAllPublications
    ? allPublications.length
    : 5;

  console.log(item.attributes.name, index);
  return (
    <Fade triggerOnce={true} fraction={0.1}>
      <section className={`layout sectionPy group ${cardBg}`}>
        <div className="space-y-1 lg:space-y-3">
          <div className="flex items-end space-x-3 duration-300 group-hover:text-orange">
            <h2 className="lg:leading-none">{item.attributes.name}</h2>
            <h4 className="font-light">{`(${item.attributes.pronouns})`}</h4>
          </div>
          {item.attributes.position && <h3>{item.attributes.position}</h3>}
        </div>

        <div className="sectionPt grid-cols-3 lg:grid">
          <div>
            {item.attributes.image.data && (
              <div className="relative h-24 w-24 flex-shrink-0 rounded-full duration-300 group-hover:grayscale-0 lg:h-40 lg:w-40 lg:grayscale ">
                <Image
                  src={`${CMS_URL}${item.attributes.image.data.attributes.url}`}
                  alt={`${CMS_URL}${item.attributes.name}`}
                  className="rounded-full  object-cover"
                  fill
                  priority
                  sizes="100vw"
                />
              </div>
            )}
          </div>

          <div className=" col-span-2 space-y-6 pt-6 lg:pt-0">
            <h3 className="duration-300 group-hover:text-orange">{t("bio")}</h3>
            <p>{item.attributes.bio}</p>

            {item.attributes.projects.data.length >= 1 && (
              <>
                <h3 className="duration-300 group-hover:text-orange">
                  {item.attributes.projects.data.length === 1
                    ? `${t("project")}`
                    : `${t("project")}s`}
                </h3>
                <ul className="space-y-2">
                  {item.attributes.projects.data.map((item, i) => (
                    <li key={i} className="">
                      <Link
                        className="flex items-center space-x-2"
                        href={`/research#${removeAccentsAndSpaces(
                          item.attributes.slug
                        )}`}
                      >
                        <MagnifyingGlassCircleIcon className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />

                        <p className="duration-300 hover:text-orange">
                          {item.attributes.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {publicationsSorted.length >= 1 && (
              <>
                <h3 className="duration-300 group-hover:text-orange">
                  Publications
                </h3>
                <div className="">
                  {publicationsSorted.map((group, groupIndex) => {
                    const type =
                      group.type.charAt(0).toUpperCase() + group.type.slice(1);
                    return (
                      <div key={groupIndex}>
                        <p
                          className={`my-3 font-semibold ${
                            locale === "en" ? "capitalize" : ""
                          }`}
                        >
                          {type}
                        </p>
                        <ul className="ml-4 list-inside list-disc space-y-2">
                          {group.publications
                            .sort((a, b) =>
                              a.attributes.date > b.attributes.date ? -1 : 1
                            )
                            .slice(0, totalDisplayedPublications)
                            .map((publication, i) => (
                              <li key={i}>
                                {publication.attributes.link ? (
                                  <Link
                                    href={publication.attributes.link}
                                    target="_blank"
                                  >
                                    <span className="duration-300 hover:text-orange">
                                      {publication.attributes.reference}
                                    </span>
                                  </Link>
                                ) : (
                                  <span>
                                    {publication.attributes.reference}
                                  </span>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    );
                  })}
                  {allPublications.length > 5 && !showAllPublications && (
                    <div className="pt-6">
                      <UIButton
                        className="text-primary hover:text-primary-dark"
                        onClick={() => setShowAllPublications(true)}
                      >
                        {t("showAllPublications")}
                      </UIButton>
                    </div>
                  )}
                </div>
              </>
            )}

            <LinkUnderline path={`mailto:${item.attributes.email}`}>
              {t("contactMe")}
            </LinkUnderline>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default TeamCard;
