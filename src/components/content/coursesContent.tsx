import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { CourseTypes } from '@/types/ResponsesInterface';

type Courses = {
  courses: CourseTypes[];
};
const CoursesContent = ({ courses }: Courses) => {
  const { t } = useTranslation();

  return (
    <section className='col-span-4 py-6 lg:py-12'>
      <div className='layout grid-cols-2 items-start  lg:grid'>
        {courses.map((course, i) => {
          return (
            <div
              className='relative mt-12 w-full border border-mturquoise-700 bg-mgray-400 dark:border-mturquoise-500 dark:bg-mblack-600 lg:w-[95%] '
              key={i}
            >
              {/* mobile version */}

              <Link
                className='border-1 -mt-6 block  rounded-xl border border-mturquoise-700 bg-mgray-400  py-2 px-2  text-center font-mono text-sm font-bold uppercase dark:border-mturquoise-500 dark:bg-mblack-600  lg:hidden'
                href={`/courses/${course.attributes.slug}`}
              >
                {course.attributes.title}
              </Link>

              {/* desktop version */}

              <Link
                className='border-1 hoverText -mt-6 ml-6 hidden w-3/5 rounded-xl border border-mturquoise-700 bg-mgray-400 py-2 px-2 text-center font-mono text-sm font-bold uppercase text-mturquoise-700  duration-300 hover:bg-mturquoise-700 hover:text-mgray-400 dark:border-mturquoise-500 dark:bg-mblack-600 dark:text-mturquoise-500 hover:dark:bg-mturquoise-500 hover:dark:text-mblack-500 lg:left-12 lg:-top-6 lg:block lg:px-4 lg:text-base'
                href={`/courses/${course.attributes.slug}`}
              >
                {course.attributes.title}
              </Link>

              <div className=' p-6 text-sm lg:p-12 lg:text-base'>
                <p>{course.attributes.content}</p>

                <div className='pt-6'>
                  <Link
                    href={`/courses/${course.attributes.slug}`}
                    className='textHover text-sm underline underline-offset-4'
                  >
                    {t('readMore')}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoursesContent;
