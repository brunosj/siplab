import Link from "next/link";
import Image from "next/image";
import { NewsTypes } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CMS_URL } from "src/lib/constants";
import LinkUnderline from "../ui/LinkUnderline";
import ReactMarkdown from "react-markdown";

interface Props {
  item: NewsTypes;
}

const NewsCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  return (
    <div className="relative flex list-none flex-col justify-between   rounded-md  duration-300">
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

      {item.attributes.image?.data && (
        <div className="relative rounded-t-md">
          <Image
            src={`${CMS_URL}${item.attributes.image.data.attributes.url}`}
            alt="News"
            className="rounded-t-md object-contain"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            width={0}
            height={0}
          />
        </div>
      )}
      <div className="flex flex-col space-y-6 rounded-b-md bg-pri p-6 dark:bg-pri-dark">
        <h4 className="duration-300 group-hover:text-orange">
          {item.attributes.title}
        </h4>

        {item.attributes.content && (
          <div className="markdownTextSm">
            <ReactMarkdown>{item.attributes.content}</ReactMarkdown>
          </div>
        )}
        {item.attributes.link && (
          <LinkUnderline path="/publications">{t("readMore")}</LinkUnderline>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
