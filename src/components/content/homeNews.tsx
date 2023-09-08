import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import NewsListing from './newsListing';
import NewsIndex from './newsIndex';
import Link from 'next/link';
import { NewsTypes } from '@/types/ResponsesInterface';

type News = {
  news: NewsTypes[];
};

const HomeNews = ({ news }: News) => {
  const { t } = useTranslation('common');

  return (
    <section className='borderLight relative grid-cols-2 px-6 pt-12 lg:grid lg:px-0'>
      <div className='z-50 self-start lg:sticky lg:top-24 lg:px-24'>
        <Link href='/news'>
          <h2 className='textHover text-2xl underline lg:text-3xl'>
            {t('news')}
          </h2>
        </Link>
      </div>
      <NewsListing news={news} />
    </section>
  );
};

export default HomeNews;
