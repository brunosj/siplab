import type { NextPage } from "next";
import { HomepageTypes } from "src/types/ResponsesInterface";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import MarkdownParser from "@/utils/markdownParser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import { Seo } from "@/components/SEO";

const Privacy: NextPage<{
  page: HomepageTypes;
}> = ({ page }) => {
  return (
    <>
      <Seo
        title={page.attributes.info.title}
        description={page.attributes.info.summary}
      />
      <Layout>
        <PageHeaderTitle
          title={page.attributes.info.title}
          description={page.attributes.info.summary}
        />
        <section className="bg-sec">
          <div className="layout sectionPy markdown m-auto lg:max-w-[80%] ">
            <MarkdownParser markdown={page.attributes.content} />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pageRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}privacy-policy?locale=${locale}&populate=*`
  );
  const page = await pageRes.json();

  return {
    props: {
      page: page.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
