import Link from "next/link";
import Image from "next/image";
import { PublicationTypes, Authors } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { formatDate, formatPublicationType } from "@/utils/utils";
import { useRouter } from "next/router";
import LinkUnderline from "../ui/LinkUnderline";

interface Props {
  items: PublicationTypes[];
}

const HomePublications = ({ items }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const latestPublications = items
    .sort((a, b) => (a.attributes.date > b.attributes.date ? -1 : 1))
    .slice(0, 3);

  let authors: Authors[] = [];

  return (
    <section className="layout sectionPy bg-sec  dark:bg-pri-darker">
      <h2>{t("latestPublications")}</h2>
      <ul className="padTop12 grid-cols-3 gap-12 lg:grid ">
        {latestPublications.map((item, i) => (
          <Link href={`publications/${item.attributes.slug}`} key={i}>
            <li className="group relative mb-6 flex h-full list-none flex-col justify-between rounded-t-md border-b-4 border-b-orange bg-neutral-100 duration-300 hover:bg-pri dark:bg-pri-dark dark:text-white dark:hover:bg-neutral-700 lg:mb-0">
              {/* <div className='relative h-32 w-full lg:h-48'>
              {item.attributes.image?.data && (
                <Image
                  src={item.attributes.image.data.attributes.url}
                  alt=''
                  fill
                  className='rounded-t-md object-cover object-center'
                />
              )}
            </div> */}
              <div className="flex-grow p-4 text-sm ">
                <h4 className="duration-300 group-hover:text-orange">
                  {item.attributes.title}
                </h4>
                {/* <div className="flex flex-col space-y-3 pt-6">
                  <p className="text-sm">{item.attributes.abstract}</p>

                  <div>
                    {authors.map((author, i) => (
                      <span className="text-sm italic" key={i}>
                        {author.name}
                        {i < authors.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
              <div className="mt-auto flex justify-between p-4 text-sm">
                <span>
                  {formatPublicationType(item.attributes.type, locale)}
                </span>

                <span>{formatDate(item.attributes.date, locale)}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="padTop12 flex justify-end">
        <LinkUnderline path="/publications">
          {t("allPublications")}
        </LinkUnderline>
      </div>
    </section>
  );
};

export default HomePublications;
