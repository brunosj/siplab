import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import PageNavigationSection from '../layout/pageNavigationSection';
import PageContentSection from '../layout/pageContentSection';

const BlogContent = ({ content }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <PageNavigationSection pageNavigationTitle=''>
        <div className='font-mono'>
          <p>
            {t('publishedOn')}: {content.attributes.date}
          </p>
          <p>
            {t('writtenBy')}: {content.attributes.author}
          </p>
          <p>Tags:</p>
          <span>{content.attributes.tag1}</span>
          <span>{content.attributes.tag2}</span>
        </div>
      </PageNavigationSection>
      <PageContentSection className='col-span-3 px-6 py-12 lg:px-24'>
        <article className='markdown'>
          <ReactMarkdown>{content.attributes.content}</ReactMarkdown>
        </article>
      </PageContentSection>
    </>
  );
};

export default BlogContent;
