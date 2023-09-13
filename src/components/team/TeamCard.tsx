import { PublicationTypes, TeamTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import { CMS_URL } from "src/lib/constants";
import Link from "next/link";
import { formatTeamPosition } from "@/utils/utils";
import LinkUnderline from "../ui/LinkUnderline";
import { useState } from "react";
import UIButton from "../ui/UIButton";

interface Props {
  item: TeamTypes;
  index: number;
}
const TeamCard = ({ item, index }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const cardBg =
    index % 2 === 0 ? "bg-sec dark:bg-pri-darker" : "bg-pri dark:bg-pri-dark";

  // Combine and sort publications
  const allPublications: PublicationTypes[] = [
    ...item.attributes.publications.data,
    ...item.attributes.otherPublications.map((other) => ({
      attributes: {
        title: other.title,
        link: other.link,
        type: "",
        date: "",
      },
    })),
  ];

  // Sort the combined publications by title A-Z
  const publicationsSorted = allPublications.sort((a, b) =>
    a.attributes.title.localeCompare(b.attributes.title)
  );

  const [showAllPublications, setShowAllPublications] =
    useState<boolean>(false);

  return (
    <section className={`layout sectionPy group ${cardBg}`}>
      <div className="space-y-1 lg:space-y-3">
        <h2 className="duration-300 group-hover:text-orange">
          {item.attributes.name}
        </h2>
        <h3>{formatTeamPosition(item.attributes.position, locale)}</h3>
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
          <h3>{t("bio")}</h3>
          <p>{item.attributes.bio}</p>
          <h3>Publications</h3>
          <div className="text-xs lg:text-sm">
            {showAllPublications ? (
              <div className="space-y-2">
                {publicationsSorted.map((publication, i) => (
                  <li key={i} className=" list-inside list-disc">
                    {publication.attributes.link ? (
                      <Link href={publication.attributes.link} target="_blank">
                        <span className="duration-300 hover:text-orange">
                          {" "}
                          {publication.attributes.title}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <span>{publication.attributes.title}</span>
                      </>
                    )}
                  </li>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {publicationsSorted.slice(0, 5).map((publication, i) => (
                  <li key={i} className=" list-inside list-disc">
                    {publication.attributes.link ? (
                      <Link href={publication.attributes.link} target="_blank">
                        <span className="duration-300 hover:text-orange">
                          {" "}
                          {publication.attributes.title}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <span>{publication.attributes.title}</span>
                      </>
                    )}
                  </li>
                ))}
              </div>
            )}
            {!showAllPublications && (
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

          <LinkUnderline path={`mailto:${item.attributes.email}`}>
            {t("contactMe")}
          </LinkUnderline>
        </div>
      </div>
    </section>
  );
};

export default TeamCard;
