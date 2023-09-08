import * as React from "react";
import { useState } from "react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { PageTypes, ProjectTypes } from "src/types/ResponsesInterface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import { Seo } from "@/components/SEO";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import ProjectDetails from "@/components/research/ProjectDetails";

const ResearchPage: NextPage<{
  pages: PageTypes[];
  research: ProjectTypes[];
}> = ({ pages, research }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "research");

  const { t } = useTranslation();

  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(
    null
  );

  const fundedProjects = research.filter(
    (project) => project.attributes.type === "funded project"
  );
  const studentProjects = research.filter(
    (project) => project.attributes.type === "student project"
  );

  const handleProjectClick = (project: ProjectTypes) => {
    setSelectedProject(project);
  };

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
          <div className="layout relative grid grid-cols-3 gap-12 bg-sec pb-12">
            {/* Sidebar */}
            <div className="col-span-1 -mt-24  ">
              <div className="sticky top-16 w-3/5 rounded-md border bg-sec shadow-sm">
                <ul>
                  {fundedProjects.length > 1 && (
                    <li className="">
                      <div className="border-b p-4 font-sec font-bold tracking-wide">
                        Faculty Projects
                      </div>
                      <ul>
                        {fundedProjects.map((project) => (
                          <li
                            key={project.id}
                            className={`cursor-pointer border-b p-4 text-sm ${
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
                      <span className="p-4 font-bold">Student Projects</span>
                      <ul>
                        {studentProjects.map((project) => (
                          <li
                            key={project.id}
                            className={`cursor-pointer border-b p-4 text-sm ${
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
            </div>

            {/* Project List and Details */}
            <div className="sectionPy col-span-2">
              {selectedProject ? (
                <ProjectDetails
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              ) : (
                <h2 className="">{t("projectDetails")}</h2>
              )}
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
    `${process.env.STRAPI_PUBLIC_API_URL}projects?locale=${locale}&populate[publications][populate]`
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
