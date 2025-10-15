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

  // Split team into current members and alumni
  const teamMembers = team.filter(
    (member) => member.attributes.status === "Team member"
  );
  const alumni = team
    .filter((member) => member.attributes.status === "Alum")
    .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

  // Separate lead from other lab members
  const lead = teamMembers.filter(
    (member) => member.attributes.name === "Marianne Quirouette"
  );
  const labMembers = teamMembers
    .filter((member) => member.attributes.name !== "Marianne Quirouette")
    .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

  const lastTeamMemberIndex = teamMembers.length - 1;

  // Set PageHeaderTitle background based on the last team member
  const headerColor =
    lastTeamMemberIndex % 2 === 0
      ? "bg-sec dark:bg-pri-darker"
      : "bg-pri dark:bg-pri-dark";

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

      {teamMembers.length > 0 && (
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
      {alumni.length > 0 && (
        <>
          <PageHeaderTitle
            title={"Alumni"}
            description={""}
            textColor="text-black"
            bgColor={headerColor}
            paddingTop="py-12"
          />
          {alumni.length > 0 && (
            <ul>
              {alumni.map((item, index) => (
                <li
                  key={index}
                  className={`list-none ${index === 0 ? headerColor : ""}`}
                >
                  <TeamCard item={item} index={index} reverse={true} />
                </li>
              ))}
            </ul>
          )}
        </>
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
