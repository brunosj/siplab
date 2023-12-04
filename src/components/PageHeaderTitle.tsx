import { Props } from "src/types/PropsInterface";
import { Fade, Slide } from "react-awesome-reveal";

interface PageHeaderTitle extends Props {
  description?: string;
  title: string;
}

const PageHeaderTitle = ({ title, description }: PageHeaderTitle) => {
  return (
    <section className="py-12 lg:py-36">
      <Slide direction="up" triggerOnce={true} duration={500}>
        <Fade triggerOnce={true} cascade damping={0.1}>
          <div className="layout font-sec text-3xl  text-orange lg:text-6xl">
            {title}
          </div>
          <div className="layout textPri mt-3 font-sec  text-lg lg:mt-6 lg:text-2xl">
            {description}
          </div>
        </Fade>
      </Slide>
    </section>
  );
};

export default PageHeaderTitle;
