import { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import { PageTypes, PublicationTypes } from "src/types/ResponsesInterface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "@/components/Layout";
import { Seo } from "@/components/SEO";
import PublicationFilter from "@/components/publications/PublicationsFilter";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import PublicationCard from "@/components/publications/PublicationCard";
import { useRouter } from "next/router";
import UIButton from "@/components/ui/UIButton";

const PublicationsPage: NextPage<{
  pages: PageTypes[];
  publications: PublicationTypes[];
}> = ({ pages, publications }) => {
  const [page] = pages.filter(
    (page) => page.attributes.slug === "publications"
  );
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const publicationsSorted = publications.sort((a, b) =>
    a.attributes.date > b.attributes.date ? -1 : 1
  );

  const [filteredPublications, setFilteredPublications] =
    useState<PublicationTypes[]>(publicationsSorted);

  const [displayedPublications, setDisplayedPublications] = useState<
    PublicationTypes[]
  >(publicationsSorted.slice(0, 5));

  const [selectedType, setSelectedType] = useState<string[]>([]);

  const loadMorePublications = useCallback(() => {
    // Make sure not to exceed the length of filteredPublications
    const currentlyDisplayedCount = displayedPublications.length;
    const nextPublications = filteredPublications.slice(
      currentlyDisplayedCount,
      currentlyDisplayedCount + 5
    );

    if (nextPublications.length > 0) {
      setDisplayedPublications((prevDisplayed) => [
        ...prevDisplayed,
        ...nextPublications,
      ]);
    }
  }, [displayedPublications, filteredPublications]);

  const handleFilterChange = useCallback(
    (filteredType: string[]) => {
      setSelectedType(filteredType);

      // Filter publications based on selectedType
      const filteredPublications = publicationsSorted.filter((publication) => {
        if (filteredType.length === 0) {
          return true;
        }
        return filteredType.includes(publication.attributes.type);
      });

      setFilteredPublications(filteredPublications);
      setDisplayedPublications(filteredPublications.slice(0, 5));
    },
    [publicationsSorted]
  );

  useEffect(() => {
    // Update displayed publications when filteredPublications changes
    setDisplayedPublications(filteredPublications.slice(0, 5));
  }, [filteredPublications]);

  return (
    <>
      <Seo
        title={page.attributes.title}
        description={page.attributes.summary}
      />
      <Layout>
        <PageHeaderTitle
          title={page.attributes.title}
          description={page.attributes.summary}
        />
        <section>
          <div className="layout relative grid-cols-3 gap-12 bg-sec dark:bg-pri-darker lg:grid">
            {/* Sidebar */}
            <div className="sectionPy col-span-1">
              {/* Include the PublicationFilter component */}
              <PublicationFilter
                publications={publicationsSorted}
                onFilterChange={handleFilterChange}
                locale={locale}
              />
            </div>

            {/* Project List and Details */}
            <div className="sectionPy col-span-2 space-y-6 lg:space-y-12">
              {displayedPublications.length > 0 ? (
                // Display displayed publications here
                displayedPublications.map((publication) => (
                  <li key={publication.id} className="list-none">
                    <PublicationCard item={publication} />
                  </li>
                ))
              ) : (
                <h2 className="">
                  No publications match the selected filters.
                </h2>
              )}
              {displayedPublications.length < filteredPublications.length && (
                <div className="flex justify-center">
                  <UIButton
                    className="text-primary hover:text-primary-dark"
                    onClick={loadMorePublications}
                  >
                    {t("loadMore")}
                  </UIButton>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PublicationsPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const pagesRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesRes.json();

  const publicationRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}publications?locale=${locale}&populate=*`
  );

  const publications = await publicationRes.json();

  return {
    props: {
      pages: pages.data,
      publications: publications.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10,
  };
}
