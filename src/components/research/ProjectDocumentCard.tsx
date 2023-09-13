import Link from "next/link";
import Image from "next/image";
import { Document } from "@/types/ResponsesInterface";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { CMS_URL } from "src/lib/constants";

interface Props {
  item: Document;
}

const ProjectDocumentCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale ?? "en";

  return (
    <div className="dark:border- group relative flex h-full list-none flex-col justify-between rounded-t-md border  border-b-4 border-b-orange duration-300 hover:bg-neutral-100 dark:border-pri-dark dark:border-b-orange dark:bg-pri-dark dark:text-white dark:hover:bg-neutral-700">
      <Link href={`${CMS_URL}${item.attributes.url}`} target="_blank">
        <div className="flex items-center space-x-6 p-6 ">
          <DocumentArrowDownIcon className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />
          <h5 className="duration-300 group-hover:text-orange">
            {item.attributes.name}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default ProjectDocumentCard;
