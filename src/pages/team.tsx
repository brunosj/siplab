import { Seo } from "@/components/SEO";
import type { NextPage } from "next";
import { PageTypes, TeamTypes } from "src/types/ResponsesInterface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import PageHeaderTitle from "@/components/PageHeaderTitle";
import TeamCard from "@/components/team/TeamCard";

const TeamPage: NextPage<{
  pages: PageTypes[];
  team: TeamTypes[];
}> = ({ pages, team }) => {
  const [page] = pages.filter((page) => page.attributes.slug === "team");

  const lead = team.filter(
    (member) => member.attributes.name === "Marianne Quirouette"
  );
  const labMembers = team
    .filter((member) => member.attributes.name !== "Marianne Quirouette")
    .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

  return (
    <Layout>
      <Seo
        title={`${page.attributes.title}`}
        description={page.attributes.summary}
      />
      <PageHeaderTitle
        title={page.attributes.title}
        description={page.attributes.summary}
      />

      {team.length > 0 && (
        <ul>
          <li className="list-none">
            <TeamCard item={lead[0]} index={1} />
          </li>
          {labMembers.map((item, index) => (
            <li key={index} className="list-none">
              <TeamCard item={item} index={index} />
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default TeamPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const pagesRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesRes.json();

  const teamRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}teams?locale=${locale}&populate=image&populate=projects&populate=publications&populate=otherPublications&populate=projects`
  );

  const team = await teamRes.json();

  return {
    props: {
      pages: pages.data,
      team: team.data,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
    revalidate: 10,
  };
}
