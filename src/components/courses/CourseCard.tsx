import { CourseTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import MarkdownParser from "@/utils/markdownParser";
import React from "react";

interface Props {
  item: CourseTypes;
}

interface LevelTranslations {
  [key: string]: string;
}

interface SemesterTranslations {
  [key: string]: string;
}

const CourseCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const levelTranslation = {
    en: {
      undergraduate: "Undergraduate",
      graduate: "Graduate",
    },
    fr: {
      undergraduate: "1er cycle",
      graduate: "2e cycle",
    },
  } as { [key: string]: LevelTranslations };

  const semestersTranslation = {
    en: {
      Winter: "Winter",
      Summer: "Summer",
      Fall: "Fall",
    },
    fr: {
      Winter: "Hiver",
      Summer: "Été",
      Fall: "Automne",
    },
  } as { [key: string]: SemesterTranslations };

  return (
    <section className="layout">
      <div className="grid-cols-3 gap-12 space-y-6 border-b py-6 lg:grid lg:space-y-0 lg:py-12">
        <div>
          <h2>{item.attributes.title}</h2>
        </div>

        <div className="col-span-2 flex flex-col space-y-6">
          <div className="markdownTextSm break-words">
            <MarkdownParser markdown={item.attributes.content} />
          </div>

          <div className="w-full text-sm ">
            {item.attributes.level && (
              <div className="grid grid-cols-3 ">
                <span>{t("level")}:</span>
                <span className="col-span-2">
                  {levelTranslation[locale][item.attributes.level]}
                </span>
              </div>
            )}
            {item.attributes.semesters && (
              <div className="grid grid-cols-3">
                <span>{t("semester")}:</span>
                <span className="col-span-2">
                  {item.attributes.semesters.map((semesterInfo, i) => {
                    const parts = semesterInfo.split(" ");
                    const semester = parts[0];
                    const year = parts.slice(1).join(" ");

                    const translatedSemester =
                      semestersTranslation[locale][semester] || semester;

                    return (
                      <React.Fragment key={i}>
                        {i > 0 && i < item.attributes.semesters.length
                          ? " - "
                          : null}
                        <span>{`${translatedSemester} ${year}`}</span>
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
            )}

            {item.attributes.university && (
              <div className="grid grid-cols-3 ">
                <span>{t("university")}:</span>
                <span className="col-span-2">{item.attributes.university}</span>
              </div>
            )}

            {item.attributes.instructors.data.length >= 1 && (
              <div className="grid grid-cols-3 ">
                <span>{t("instructor")}:</span>
                {item.attributes.instructors.data.map((item, i) => (
                  <li key={i} className="col-span-2">
                    <span>{item.attributes.name}</span>
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
