import Link from "next/link";
import Image from "next/image";
import { PublicationTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { formatDate, formatPublicationType } from "@/utils/utils";
import PublicationCardChild from "./PublicationCardChild";

interface Props {
  item: PublicationTypes;
}

const PublicationCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  return (
    <div
      className={`dark:border- group relative flex h-full list-none flex-col justify-between rounded-t-md border  border-b-4 border-b-orange duration-300  dark:border-pri-dark dark:border-b-orange dark:bg-pri-dark dark:text-white  ${
        item.attributes.type !== "conferences"
          ? "hover:bg-neutral-100 dark:hover:bg-neutral-700"
          : ""
      }`}
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

      {item.attributes.type !== "conferences" && item.attributes.slug ? (
        <Link href={`publications/${item.attributes.slug}`}>
          <PublicationCardChild item={item} />
        </Link>
      ) : item.attributes.link ? (
        <a href={item.attributes.link} target="_blank">
          <PublicationCardChild item={item} />
        </a>
      ) : (
        <PublicationCardChild item={item} />
      )}
    </div>
  );
};

export default PublicationCard;
