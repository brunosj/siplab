import Link from "next/link";
import Image from "next/image";
import { PublicationTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { formatDate, formatPublicationType } from "@/utils/utils";

interface Props {
  item: PublicationTypes;
}

const PublicationCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const authors = item.attributes.authors || [];

  return (
    <div className="dark:border- group relative flex h-full list-none flex-col justify-between rounded-t-md border  border-b-4 border-b-orange duration-300 hover:bg-neutral-100 dark:border-pri-dark dark:border-b-orange dark:bg-pri-dark dark:text-white dark:hover:bg-neutral-700">
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
      <Link href={item.attributes.link}>
        <div className="flex-grow text-sm ">
          <div className="flex items-center justify-between text-xs lg:text-sm">
            <span className="rounded-br-md rounded-tl-md bg-orange px-6 py-2 text-white">
              {formatPublicationType(item.attributes.type, locale)}
            </span>
            <span className="px-6">
              {formatDate(item.attributes.date, locale)}
            </span>
          </div>
          <div className="flex flex-col space-y-6 p-6 ">
            <h4 className="duration-300 group-hover:text-orange">
              {item.attributes.title}
            </h4>

            {item.attributes.abstract && (
              <p className="text-sm">{item.attributes.abstract}</p>
            )}
            <div>
              {authors.map((author, i) => (
                <span className="text-sm italic" key={i}>
                  {author.name}
                  {i < authors.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PublicationCard;
