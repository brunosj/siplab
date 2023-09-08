import { Props } from "src/types/PropsInterface";

interface PageHeaderTitle extends Props {
  description?: string;
  title: string;
}

const PageHeaderTitle = ({ title, description }: PageHeaderTitle) => {
  return (
    <section className="py-12 lg:py-36">
      <div className="layout font-sec text-3xl  text-orange lg:text-6xl">
        {title}
      </div>
      <div className="layout textPri mt-3 font-sec  text-lg lg:mt-6 lg:text-2xl">
        {description}
      </div>
    </section>
  );
};

export default PageHeaderTitle;
