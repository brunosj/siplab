import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NewsTypes } from '@/types/ResponsesInterface';

type News = {
  news: NewsTypes[];
  newsBgColor: string;
};

const NewsIndex = ({ news, newsBgColor }: News) => {
  const { t } = useTranslation('common');

  const newsSorted = news.sort((a: NewsTypes, b: NewsTypes) =>
    a.attributes.date > b.attributes.date ? -1 : 1
  );
  return (
    <div className='borderLight flex flex-col gap-12 py-12'>
      {newsSorted.map((item, i) => {
        return (
          <div key={i} className={clsx('p-6 md:grid lg:p-12', newsBgColor)}>
            <div className='flex flex-col justify-center'>
              <h1 className=' text-morange-700 accent-morange-500 dark:text-morange-500'>
                {item.attributes.title}
              </h1>

              <ReactMarkdown className='markdown mt-6 '>
                {item.attributes.content}
              </ReactMarkdown>
              {item.attributes.date && (
                <div className='mt-6 flex items-center gap-4  text-mgray-800'>
                  <span className='mt-2'>
                    <CalendarDaysIcon className='h-5 w-5 ' />
                  </span>
                  <p className='mt-3 font-mono text-sm'>
                    {`${item.attributes.date
                      .slice(-5)
                      .slice(-2)}${item.attributes.date.slice(
                      4,
                      8
                    )}${item.attributes.date.slice(0, 4)} `}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsIndex;
