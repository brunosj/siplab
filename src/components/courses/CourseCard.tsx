import { CourseTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
      "winter 2020": "Winter 2020",
      "summer 2020": "Summer 2020",
      "fall 2020": "Fall 2020",
      "winter 2021": "Winter 2021",
      "summer 2021": "Summer 2021",
      "fall 2021": "Fall 2021",
      "winter 2022": "Winter 2022",
      "summer 2022": "Summer 2022",
      "fall 2022": "Fall 2022",
      "winter 2023": "Winter 2023",
      "summer 2023": "Summer 2023",
      "fall 2023": "Fall 2023",
      "winter 2024": "Winter 2024",
      "summer 2024": "Summer 2024",
      "fall 2024": "Fall 2024",
    },
    fr: {
      "winter 2020": "Hiver 2020",
      "summer 2020": "Été 2020",
      "fall 2020": "Automne 2020",
      "winter 2021": "Hiver 2021",
      "summer 2021": "Été 2021",
      "fall 2021": "Automne 2021",
      "winter 2022": "Hiver 2022",
      "summer 2022": "Été 2022",
      "fall 2022": "Automne 2022",
      "winter 2023": "Hiver 2023",
      "summer 2023": "Été 2023",
      "fall 2023": "Automne 2023",
      "winter 2024": "Hiver 2024",
      "summer 2024": "Été 2024",
      "fall 2024": "Automne 2024",
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
            <ReactMarkdown>{item.attributes.content}</ReactMarkdown>
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
