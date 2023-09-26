import type { NextPage } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "next-i18next";
import { formatDate, formatPublicationType } from "@/utils/utils";
import { PublicationTypes } from "@/types/ResponsesInterface";
import { Seo } from "@/components/SEO";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import { DocumentArrowDownIcon, LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { CMS_URL } from "src/lib/constants";

interface PublicationPage {
  content: PublicationTypes;
  otherLocaleContent: PublicationTypes;
}
const Publication: NextPage<PublicationPage> = ({
  content,
  otherLocaleContent,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const publicationSlug = content.attributes.slug;
  const currentContent = locale === "en" ? content : otherLocaleContent;
  const authors = currentContent.attributes.authors || [];

  return (
    <Layout>
      <Seo
        title={`${currentContent.attributes.title.slice(0, -11)} |`}
        description={currentContent.attributes.summary}
      />
      <PageHeaderTitle
        title={currentContent.attributes.title}
        description={currentContent.attributes.summary}
      />
      <section className="layout sectionPy relative grid-cols-3 gap-12 bg-sec dark:bg-pri-darker lg:grid">
        <div className="space-y-3">
          <div className="text-sm lg:text-base">
            <p className="font-semibold text-orange">{t("Type")}</p>
            <span className="">
              {formatPublicationType(currentContent.attributes.type, locale)}
            </span>
          </div>
          {currentContent.attributes.date && (
            <div className="text-sm lg:text-base">
              <p className="font-semibold text-orange">{t("Date")}</p>
              <span className="">
                {formatDate(currentContent.attributes.date, locale)}
              </span>
            </div>
          )}
          {authors.length >= 1 && (
            <div className="text-sm lg:text-base">
              <p className="font-semibold text-orange">{t("authors")}</p>
              {authors.map((author, i) => (
                <span className="" key={i}>
                  {author.name}
                  {i < authors.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}

          <div className="flex space-x-3 pt-1 lg:pt-3">
            {currentContent.attributes.file?.data && (
              <Link
                href={`${CMS_URL}${currentContent.attributes.file.data.attributes.url}`}
                target="_blank"
              >
                <DocumentArrowDownIcon className="h-6 w-6 shrink-0 duration-300 hover:text-orange lg:h-8 lg:w-8" />
              </Link>
            )}

            {currentContent.attributes.link && (
              <Link
                href={`${CMS_URL}${currentContent.attributes.link}`}
                target="_blank"
              >
                <LinkIcon className="h-6 w-6 shrink-0 duration-300 hover:text-orange lg:h-8 lg:w-8" />
              </Link>
            )}
          </div>
        </div>
        <div className="col-span-2 flex-grow pt-6 text-sm lg:pt-0">
          {/* <h2 className="duration-300 group-hover:text-orange">
              {currentContent.attributes.title}
            </h2> */}

          {currentContent.attributes.abstract && (
            <ReactMarkdown>{currentContent.attributes.abstract}</ReactMarkdown>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Publication;

export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string };
  locale: string;
}) {
  const { slug } = params;
  const initialRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}publications?locale=all&populate=*`
  );
  const initial = await initialRes.json();
  // Find the entry for the current locale
  const currentLocaleEntry = initial.data.find(
    (entry: PublicationTypes) =>
      entry.attributes.slug === slug && entry.attributes.locale === "en"
  );

  // Find the entry for the other locale
  const otherLocaleEntry = currentLocaleEntry.attributes.localizations.data[0];

  return {
    props: {
      content: currentLocaleEntry,
      otherLocaleContent: otherLocaleEntry,
      ...(await serverSideTranslations(locale ?? "en")),
    },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_PUBLIC_API_URL}publications?locale=all&populate=localizations`
    );
    const items = await res.json();

    if (!items || !items.data) {
      console.error("No data received from the API");
      return {
        paths: [],
        fallback: "blocking",
      };
    }

    const validPaths = items.data
      .filter((item: PublicationTypes) => {
        return (
          item.attributes &&
          typeof item.attributes.slug === "string" &&
          item.attributes.slug.trim() !== ""
        );
      })
      .map((item: PublicationTypes) => ({
        params: { slug: item.attributes.slug },
        locale: item.attributes.locale || "en",
      }));

    if (validPaths.length === 0) {
      console.error("No valid paths found");
      return {
        paths: [],
        fallback: "blocking",
      };
    }

    return {
      paths: validPaths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}
