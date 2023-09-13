import type { NextPage } from "next";
import { PageTypes, CourseTypes } from "src/types/ResponsesInterface";
import { Seo } from "@/components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import Layout from "@/components/Layout";
import CourseCard from "@/components/courses/CourseCard";

const CoursesPage: NextPage<{
  pages: PageTypes[];
  courses: CourseTypes[];
}> = ({ pages, courses }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "teaching");

  const coursesSorted = courses.sort((a, b) =>
    a.attributes.title > b.attributes.title ? 1 : -1
  );

  return (
    <Layout>
      <Seo
        title={page.attributes.title}
        description={page.attributes.summary}
      />
      <section>
        <PageHeaderTitle
          title={page.attributes.title}
          description={page.attributes.summary}
        >
          {page.attributes.title}
        </PageHeaderTitle>

        {coursesSorted.length > 0 && (
          <ul className="sectionPy  bg-sec dark:bg-pri-darker">
            {coursesSorted.map((item, i) => (
              <li key={i} className="list-none">
                <CourseCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
};

export default CoursesPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();

  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}courses?locale=${locale}&populate=instructors`
  );
  const courses = await res.json();

  return {
    props: {
      pages: pages.data,
      courses: courses.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
