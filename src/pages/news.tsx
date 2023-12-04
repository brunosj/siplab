import type { NextPage } from "next";
import { PageTypes, NewsTypes } from "src/types/ResponsesInterface";
import { Seo } from "@/components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import NewsCard from "@/components/news/NewsCard";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import { Fade } from "react-awesome-reveal";

const NewsPage: NextPage<{
  pages: PageTypes[];
  news: NewsTypes[];
}> = ({ pages, news }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "news");

  const newsSorted = news.sort((a, b) =>
    a.attributes.date > b.attributes.date ? -1 : 1
  );

  return (
    <Layout>
      <Seo
        title={page.attributes.title}
        description={page.attributes.summary}
      />
      <section className="">
        <PageHeaderTitle
          title={page.attributes.title}
          description={page.attributes.summary}
        >
          {page.attributes.title}
        </PageHeaderTitle>

        {newsSorted.length >= 1 && (
          <div className="sectionPy layout bg-sec dark:bg-pri-darker">
            <div className="flex flex-wrap justify-between gap-4">
              {newsSorted.map((item, i) => (
                <li
                  key={i}
                  className="h-auto w-full list-none md:w-[47%] lg:w-[32%]"
                >
                  <Fade triggerOnce={true} fraction={0.1} cascade damping={0.1}>
                    <NewsCard item={item} />
                  </Fade>
                </li>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default NewsPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();

  const newsResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}news-items?locale=${locale}&populate=*`
  );

  const news = await newsResponse.json();

  return {
    props: {
      pages: pages.data,
      news: news.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10,
  };
}
