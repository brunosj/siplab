import { ProjectTypes } from "@/types/ResponsesInterface";

const ProjectDetails: React.FC<{
  project: ProjectTypes;
  onClose: () => void;
}> = ({ project, onClose }) => {
  return (
    <div className="space-y-6">
      {/* <button className="mb-4 text-blue-600 hover:underline" onClick={onClose}>
        Back to Project List
      </button> */}
      <h2 className="">{project.attributes.title}</h2>
      <p className="mb-4">{project.attributes.summary}</p>
      <div className="py-64"></div>
    </div>
  );
};

export default ProjectDetails;
