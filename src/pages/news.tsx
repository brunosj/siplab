import type { NextPage } from 'next';
import { PageTypes, NewsTypes } from 'src/types/ResponsesInterface';
import { Seo } from '@/components/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHeaderTitle from '@/components/layout/pageHeaderTitle';
import PageContentGrid from '@/components/layout/pageContentGrid';
import Layout from '@/components/Layout';
import OutreachContent from '@/components/content/outreachContent';
import NewsIndex from '@/components/content/newsIndex';
import NewsListing from '@/components/content/newsListing';

const NewsPage: NextPage<{
  pages: PageTypes[];
  news: NewsTypes[];
}> = ({ pages, news }) => {
  const [page] = pages.filter((page) => page.attributes.slug === 'news');
  return (
    <Layout>
      <Seo
        title={`${page.attributes.title} |`}
        description={page.attributes.summary}
      />
      <section className=''>
        <PageHeaderTitle
          textColor='text-morange-700 dark:text-morange-500'
          svgBackground='textureBgTurquoise'
          description={page.attributes.summary}
        >
          {page.attributes.title}
        </PageHeaderTitle>
        <PageContentGrid>
          <div className='layout col-span-4'>
            <NewsIndex
              news={news}
              newsBgColor='dark:bg-mblack-600 bg-mgray-500'
            />
          </div>
        </PageContentGrid>
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
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
}
