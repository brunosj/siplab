import Link from "next/link";
import { useTranslation } from "next-i18next";
import HeroListing from "./HeroListing";
import { NewsTypes, ProjectTypes } from "@/types/ResponsesInterface";
import LinkUnderline from "../ui/LinkUnderline";
import { Fade, Slide } from "react-awesome-reveal";

interface Props {
  summary: string;
  heroText: string;
  news: NewsTypes[];
  projects: ProjectTypes[];
}

const Hero = ({ summary, heroText, news, projects }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="layout py-12 lg:py-24">
      <Fade triggerOnce={true} fraction={0.5} cascade damping={0.4}>
        <div className="relative flex flex-col items-center justify-center space-y-6 text-center ">
          <div className="font-sec text-6xl font-semibold lg:text-8xl">
            <span className="text-neutral-900 underline decoration-orange">
              SIP
            </span>
            <span className="text-logoGray dark:text-logoGray">LAB</span>
          </div>

          <h2>
            <Fade cascade duration={35} triggerOnce={true}>
              {summary}
            </Fade>
          </h2>
          <div className="w-4/5 pt-3 lg:w-1/2">
            <p>{heroText}</p>
          </div>
          <div>
            <LinkUnderline path="/team">{t("meetTeam")}</LinkUnderline>
          </div>
        </div>
        <div className="justify-between gap-16 pt-12 lg:flex lg:pt-0">
          <HeroListing heading={t("labNews")} items={news} contentType="News" />
          <HeroListing
            heading={t("researchProjects")}
            items={projects}
            contentType="Projects"
          />
        </div>
      </Fade>
    </div>
  );
};

export default Hero;
