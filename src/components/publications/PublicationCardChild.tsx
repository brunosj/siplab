import { PublicationTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { formatDate, formatPublicationType } from "@/utils/utils";

interface Props {
  item: PublicationTypes;
}

const PublicationCardChild = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  const authors = item.attributes.authors || [];

  return (
    <div className="flex-grow text-sm ">
      <div className="flex items-center justify-between text-xs lg:text-sm">
        <span className="rounded-br-md rounded-tl-md bg-orange px-6 py-2 text-white">
          {formatPublicationType(item.attributes.type, locale)}
        </span>
        <span className="px-6">{formatDate(item.attributes.date, locale)}</span>
      </div>
      <div className="flex flex-col space-y-6 p-6 ">
        <h4
          className={`${
            item.attributes.slug || item.attributes.link
              ? "duration-300 group-hover:text-orange"
              : " "
          } `}
        >
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
  );
};

export default PublicationCardChild;
