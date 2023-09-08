import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ResearchTypes } from '@/types/ResponsesInterface';

type Research = {
  research: ResearchTypes[];
};
const HomeResearch = ({ research }: Research) => {
  const { t } = useTranslation('common');

  return (
    <section className='borderLight border-b'>
      <div className='layout py-16'>
        <h2 className='text-3xl underline'>{t('research')}</h2>
        <div className='mt-16 grid grid-cols-1 gap-12 lg:grid-cols-4'>
          {research.map((item, i) => {
            return (
              <Link
                key={i}
                className='borderLight grid border p-8 duration-300 hover:bg-mgray-200 hover:dark:bg-mblack-500'
                href={`/research#${item.attributes.slug}`}
              >
                <p className=''>{i + 1}</p>
                <h1 className='mt-6 text-mpurple-700 accent-mpurple-500 dark:text-mpurple-500'>
                  {item.attributes.title}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeResearch;
