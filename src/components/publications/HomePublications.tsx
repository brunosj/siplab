import Link from "next/link";
import Image from "next/image";
import { PublicationTypes } from "@/types/ResponsesInterface";
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

  return (
    <section className="layout sectionPy bg-sec text-neutral-900 dark:bg-sec-dark">
      <h2>{t("latestPublications")}</h2>
      <ul className="padTop12 grid-cols-3 gap-12 lg:grid">
        {latestPublications.map((item, i) => (
          <Link href={item.attributes.link}>
            <li
              className="group relative flex h-full list-none flex-col justify-between rounded-t-md border  border-b-4 border-b-orange duration-100 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-700"
              key={i}
            >
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
                <div className="flex flex-col space-y-3 pt-6">
                  <p className="text-sm">{item.attributes.abstract}</p>

                  <div>
                    {item.attributes.authors.map((author, i) => (
                      <span className="text-sm italic" key={i}>
                        {author.name}
                        {i < item.attributes.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
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
