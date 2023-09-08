import { CourseTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const semesterTranslation = {
    en: {
      "winter 2023": "Winter 2023",
      "fall 2023": "Fall 2023",
      "winter 2024": "Winter 2024",
    },
    fr: {
      "winter 2023": "Hiver 2023",
      "fall 2023": "Automne 2023",
      "winter 2024": "Hiver 2024",
    },
  } as { [key: string]: SemesterTranslations };

  return (
    <section className="layout">
      <div className="grid-cols-3 gap-12 space-y-6 border-b py-6 lg:grid lg:space-y-0 lg:py-12">
        <div>
          <h2>{item.attributes.title}</h2>
        </div>

        <div className="col-span-2 flex flex-col space-y-6">
          <div>
            <p>{item.attributes.summary}</p>
          </div>

          <div className="w-full text-sm lg:w-1/2">
            {item.attributes.level && (
              <div className="grid grid-cols-2 ">
                <span>{t("level")}:</span>
                <span>{levelTranslation[locale][item.attributes.level]}</span>
              </div>
            )}

            {item.attributes.semester && (
              <div className="grid grid-cols-2 ">
                <span>{t("semester")}:</span>
                <span>
                  {semesterTranslation[locale][item.attributes.semester]}
                </span>
              </div>
            )}

            {item.attributes.university && (
              <div className="grid grid-cols-2 ">
                <span>{t("university")}:</span>
                <span>{item.attributes.university}</span>
              </div>
            )}

            {item.attributes.instructors.data.length >= 1 && (
              <div className="grid grid-cols-2 ">
                <span>{t("instructor")}:</span>
                {item.attributes.instructors.data.map((item, i) => (
                  <li key={i}>
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
