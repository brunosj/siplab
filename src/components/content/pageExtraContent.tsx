import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import PageNavigationSection from '../layout/pageNavigationSection';
import PageContentSection from '../layout/pageContentSection';
import PeopleListing from './peopleListing';

const PageExtraContent = ({ content }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <PageNavigationSection pageNavigationTitle=''>
        <div className='font-mono'>
          <p className='pb-6 lg:pb-12'>{content.attributes.description}</p>

          {/* <p>Tags:</p>
          <span>{content.attributes.tag1}</span>
        <span>{content.attributes.tag2}</span> */}
          <PeopleListing people={content.attributes.people_items.data} />
        </div>
      </PageNavigationSection>
      <PageContentSection className='col-span-3 px-6 py-12 lg:px-24'>
        <div className='font-mono lg:hidden'>
          <p className='pb-6 italic'>{content.attributes.description}</p>
        </div>
        <article className='markdown pb-12 lg:pb-0'>
          <ReactMarkdown>{content.attributes.content}</ReactMarkdown>
        </article>

        <div className='lg:hidden'>
          <PeopleListing people={content.attributes.people_items.data} />
        </div>
      </PageContentSection>
    </>
  );
};

export default PageExtraContent;
