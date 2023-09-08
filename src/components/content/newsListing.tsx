import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CMS_URL } from '../../lib/constants';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { NewsTypes } from '@/types/ResponsesInterface';

type News = {
  news: NewsTypes[];
};

const NewsListing = ({ news }: News) => {
  const { t } = useTranslation('common');

  const newsSorted = news.sort((a, b) =>
    a.attributes.date > b.attributes.date ? -1 : 1
  );

  return (
    <div className='borderLight justify-between pb-12 '>
      {newsSorted.map((item, i) => {
        return (
          <div
            className='borderLight  mr-0  flex flex-col border-b pb-12 pt-12 last:mb-0 last:border-b-0 lg:mb-12 lg:mr-24 lg:pt-0'
            key={i}
          >
            <div>
              <h1 className=' text-morange-700 accent-morange-500 dark:text-morange-500'>
                {item.attributes.title}
              </h1>
            </div>
            <ReactMarkdown className='markdown mt-6 '>
              {item.attributes.content}
            </ReactMarkdown>
            {item.attributes.date && (
              <div className='mt-6 flex items-center gap-4  text-mgray-700'>
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
        );
      })}
    </div>
  );
};

export default NewsListing;
