import type { NextPage } from 'next';
import {
  NewsTypes,
  ProjectTypes,
  PublicationTypes,
  HomepageTypes,
} from 'src/types/ResponsesInterface';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import { Seo } from '@/components/SEO';
import Hero from '@/components/hero/HomeHero';
import HomePublications from '@/components/publications/HomePublications';

const Home: NextPage<{
  homepage: HomepageTypes;
  news: NewsTypes[];
  publications: PublicationTypes[];
  projects: ProjectTypes[];
}> = ({ homepage, news, publications, projects }) => {
  const newsSorted = news.sort((a: NewsTypes, b: NewsTypes) =>
    a.attributes.date > b.attributes.date ? -1 : 1
  );

  return (
    <>
      <Seo
        title={homepage.attributes.info.title}
        description={homepage.attributes.info.summary}
      />
      <Layout>
        <Hero
          summary={homepage.attributes.info.summary}
          heroText={homepage.attributes.heroText}
          news={news}
          projects={projects}
        />
        <HomePublications items={publications} />
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const homepageRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}homepage?locale=${locale}&populate=*`
  );
  const homepage = await homepageRes.json();

  const newsRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}news-items?locale=${locale}&populate=*`
  );
  const news = await newsRes.json();

  const projectsRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}projects?locale=${locale}&populate=*`
  );
  const projects = await projectsRes.json();

  const publicationsRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}publications?locale=${locale}&populate=*`
  );
  const publications = await publicationsRes.json();

  return {
    props: {
      homepage: homepage.data,
      news: news.data,
      projects: projects.data,
      publications: publications.data,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
