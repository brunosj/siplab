import * as React from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { PageTypes, ProjectTypes } from "src/types/ResponsesInterface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import { Seo } from "@/components/SEO";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import ProjectDetails from "@/components/research/ProjectDetails";
import { useRouter } from "next/router";
import { removeAccentsAndSpaces } from "@/utils/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Fade, Slide } from "react-awesome-reveal";

const ResearchPage: NextPage<{
  pages: PageTypes[];
  research: ProjectTypes[];
}> = ({ pages, research }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "research");

  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  // Project selection
  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(
    research.length > 0 ? research[0] : null
  );

  const handleProjectClick = (project: ProjectTypes) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    // Create a function to update the selected project based on the current language
    const updateSelectedProjectForLanguage = () => {
      // Find the project corresponding to the selectedProject in the current language
      const projectInCurrentLanguage = research.find(
        (project) =>
          project.attributes.slug === selectedProject?.attributes.slug
      );

      if (projectInCurrentLanguage) {
        setSelectedProject(projectInCurrentLanguage);
      }
    };

    // Listen for changes in the router.locale
    const localeChangeHandler = () => {
      // Update selectedProject when the language changes
      updateSelectedProjectForLanguage();
    };

    // Add a listener for locale changes
    router.events.on("routeChangeComplete", localeChangeHandler);

    // Call the updateSelectedProjectForLanguage function initially to set the correct project
    updateSelectedProjectForLanguage();

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", localeChangeHandler);
    };
  }, [router.locale, research, selectedProject]);

  // Projects categories
  const fundedProjects = research.filter(
    (project) => project.attributes.type === "funded project"
  );
  const studentProjects = research.filter(
    (project) => project.attributes.type === "student project"
  );

  const [isFacultyProjectsCollapsed, setIsFacultyProjectsCollapsed] =
    useState(false);
  const [isStudentProjectsCollapsed, setIsStudentProjectsCollapsed] =
    useState(false);

  const toggleFacultyProjectsCollapse = () => {
    setIsFacultyProjectsCollapsed(!isFacultyProjectsCollapsed);
  };

  const toggleStudentProjectsCollapse = () => {
    setIsStudentProjectsCollapsed(!isStudentProjectsCollapsed);
  };

  // Responsiveness
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if there is a hash in the URL (e.g., #project-slug)
    if (isDesktop) {
      const projectSlug = router.asPath.split("#")[1];
      if (projectSlug) {
        // Find the selected project based on the slug
        const project = research.find(
          (project) =>
            removeAccentsAndSpaces(project.attributes.slug) ===
            removeAccentsAndSpaces(projectSlug)
        );
        if (project) {
          setSelectedProject(project);
        }
      }
    }
  }, [router.asPath, research, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      window.scrollTo(0, 300);
    }
  }, [selectedProject]);

  return (
    <>
      <Seo
        title={`${page.attributes.title}`}
        description={page.attributes.summary}
      />
      <Layout>
        <PageHeaderTitle
          title={page.attributes.title}
          description={page.attributes.summary}
        />

        <section>
          <div className="layout relative grid-cols-3 gap-12 bg-sec pb-12 dark:bg-pri-darker lg:grid">
            {/* Sidebar */}
            <div className="col-span-1 lg:-mt-24">
              <Slide
                direction="left"
                triggerOnce={true}
                delay={150}
                className="sticky top-16 "
              >
                <Fade triggerOnce={true}>
                  <div
                    className={`w-3/5 rounded-md border bg-sec shadow-sm dark:bg-pri-darker ${
                      isDesktop ? "block" : "hidden"
                    }`}
                  >
                    {" "}
                    <ul>
                      {fundedProjects.length > 1 && (
                        <li className="">
                          <div
                            className="cursor-pointer border-b p-4 font-sec font-bold tracking-wide"
                            onClick={toggleFacultyProjectsCollapse}
                          >
                            <div className="flex items-center justify-between">
                              {t("facultyProjects")}{" "}
                              {isFacultyProjectsCollapsed ? (
                                <ChevronUpIcon className="h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                          <ul
                            className={
                              isFacultyProjectsCollapsed ? "hidden" : ""
                            }
                          >
                            {fundedProjects.map((project) => (
                              <li
                                key={project.id}
                                className={`cursor-pointer border-b p-4 text-sm duration-300 hover:bg-orange hover:text-white ${
                                  selectedProject?.id === project.id
                                    ? "bg-orange text-white duration-300  "
                                    : ""
                                }`}
                                onClick={() => handleProjectClick(project)}
                              >
                                {project.attributes.title}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}

                      {studentProjects.length > 1 && (
                        <li>
                          <div
                            className="cursor-pointer border-b p-4 font-sec font-bold tracking-wide"
                            onClick={toggleStudentProjectsCollapse}
                          >
                            <div className="flex items-center justify-between">
                              {t("studentProjects")}{" "}
                              {isStudentProjectsCollapsed ? (
                                <ChevronUpIcon className="h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="h-4 w-4" />
                              )}
                            </div>{" "}
                          </div>
                          <ul
                            className={
                              isStudentProjectsCollapsed ? "hidden" : ""
                            }
                          >
                            {studentProjects.map((project) => (
                              <li
                                key={project.id}
                                className={`cursor-pointer border-b p-4 text-sm duration-300 hover:bg-orange hover:text-white ${
                                  selectedProject?.id === project.id
                                    ? "bg-orange text-white duration-300  "
                                    : ""
                                }`}
                                onClick={() => handleProjectClick(project)}
                              >
                                {project.attributes.title}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </div>
                </Fade>
              </Slide>
            </div>
            {/* Project List and Details */}
            <div className="sectionPy col-span-2 space-y-12">
              <Fade triggerOnce={true} delay={150}>
                {isDesktop ? (
                  selectedProject ? (
                    <ProjectDetails project={selectedProject} locale={locale} />
                  ) : (
                    <h2 className="">{t("projectDetails")}</h2>
                  )
                ) : (
                  <>
                    {fundedProjects.map((project) => (
                      <ProjectDetails
                        project={project}
                        key={project.id}
                        locale={locale}
                      />
                    ))}
                    {studentProjects.map((project) => (
                      <ProjectDetails
                        project={project}
                        key={project.id}
                        locale={locale}
                      />
                    ))}
                  </>
                )}
              </Fade>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ResearchPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const pagesRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesRes.json();

  const researchRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}projects?locale=${locale}&populate[publications][populate][0]=authors&populate[documents][populate][0]=file&populate[image][populate]&populate[localizations][populate]`
  );
  const research = await researchRes.json();

  return {
    props: {
      pages: pages.data,
      research: research.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10,
  };
}
