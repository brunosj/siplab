import { ProjectTypes } from "@/types/ResponsesInterface";
import PublicationCard from "../publications/PublicationCard";
import ProjectDocumentCard from "./ProjectDocumentCard";
import Image from "next/image";
import { CMS_URL } from "src/lib/constants";
import { useTranslation } from "next-i18next";

const ProjectDetails: React.FC<{
  project: ProjectTypes;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const { t } = useTranslation();

  return (
    <article className="space-y-6 lg:space-y-12" id={project.attributes.slug}>
      {/* <button className="mb-4 text-blue-600 hover:underline" onClick={onClose}>
        Back to Project List
      </button> */}
      <h2 className="">{project.attributes.title}</h2>
      <div className="space-y-3">
        <p className="">{project.attributes.summary}</p>
        <p className="italic">
          <span>{t("funding")}</span>
          {project.attributes.funding}
        </p>
      </div>

      {project.attributes.publications.data?.length >= 1 && (
        <div className="space-y-6">
          {project.attributes.publications.data.length > 1 ? (
            <h3>Publications</h3>
          ) : (
            <h3>Publication</h3>
          )}
          {project.attributes.publications.data.map((publication) => (
            <li key={publication.id} className="list-none">
              <PublicationCard item={publication} />
            </li>
          ))}
        </div>
      )}
      {project.attributes.documents.data?.length >= 1 && (
        <div className="space-y-6">
          {project.attributes.documents.data.length > 1 ? (
            <h3>Documents</h3>
          ) : (
            <h3>Document</h3>
          )}
          {project.attributes.documents.data.map((document) => (
            <li key={document.id} className="list-none">
              <ProjectDocumentCard item={document} />
            </li>
          ))}
        </div>
      )}
      {project.attributes.image?.data && (
        <div className="relative h-48 w-full lg:h-96">
          {project.attributes.image?.data && (
            <Image
              src={`${CMS_URL}${project.attributes.image.data.attributes.url}`}
              alt=""
              fill
              className="object-contain object-center"
            />
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectDetails;
