import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { PublicationTypes } from '@/types/ResponsesInterface';
import PublicationTag from '@/ui/publicationTag';
import PublicationTextColor from '@/ui/publicationTextColor';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import PublicationDetails from './publicationDetails';
import ButtonIcon from '@/ui/buttonIcon';
import PageNavigationSection from '@/layout/pageNavigationSection';
import PageContentSection from '@/layout/pageContentSection';
import ReactMarkdown from 'react-markdown';

type Publications = {
  publications: PublicationTypes[];
};

const PublicationsContent = ({ publications }: Publications) => {
  const { t } = useTranslation();

  const menuItems = [
    ...new Set(publications.map((publication) => publication.attributes.type)),
  ];

  const [item, setItem] = useState(publications);

  const filterItem = (filteredType: {}) => {
    const newItem = publications.filter((publication) => {
      return publication.attributes.type === filteredType;
    });
    setItem(newItem);
  };

  const scrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 360, left: 0, behavior: 'smooth' });
    }
  };

  const clickEvent = (type: string) => {
    filterItem(type);
    scrollTop();
  };

  const initialState = (publications: any) => (
    setItem(publications), scrollTop()
  );
  const initialStateMobile = (publications: any) => setItem(publications);

  useEffect(() => {
    setItem(publications);
  }, [publications]);

  return (
    <>
      {/* desktop filters  */}
      <PageNavigationSection pageNavigationTitle={t('publicationTypes')}>
        <div className='flex-col text-base font-medium  lg:flex lg:text-lg'>
          <button
            className='py-3'
            onClick={() => initialState(publications)}
            aria-label='all items'
          >
            <PublicationTag
              className='flex-1'
              types={menuItems}
              type='All publications'
            >
              {t('allPublications')}
            </PublicationTag>
          </button>
          {menuItems.map((type, i) => {
            return (
              <button
                className='py-3'
                aria-label='choose category'
                onClick={() => {
                  clickEvent(type);
                }}
                key={i}
              >
                <PublicationTag
                  type={type}
                  types={menuItems}
                  className='flex-1'
                >
                  {type}
                </PublicationTag>
              </button>
            );
          })}
        </div>
      </PageNavigationSection>

      {/* mobile filters */}
      <nav className='borderLight block border-b bg-mgray-300 text-xs font-light dark:bg-mblack-700 lg:hidden '>
        <div className='grid grid-cols-2 gap-x-6 gap-y-2 py-6 px-6 lg:px-24'>
          <div className='flex items-center'>
            <PublicationTextColor types={menuItems} type='All publications'>
              <input
                className='h-4 w-4 border-gray-300 '
                onClick={() => initialStateMobile(publications)}
                name='outreach type'
                type='radio'
              />
            </PublicationTextColor>
            <label className='ml-3 block'>{t('allPublications')} </label>
          </div>
          {menuItems.map((type, i) => {
            return (
              <div className='flex items-center' key={i}>
                <PublicationTextColor type={type} types={menuItems}>
                  <input
                    className='h-4 w-4 border-gray-300 '
                    onClick={() => {
                      filterItem(type);
                    }}
                    name='outreach type'
                    type='radio'
                  />
                </PublicationTextColor>
                <label htmlFor={String(i)} className='ml-3 block'>
                  {type}
                </label>
              </div>
            );
          })}
        </div>
      </nav>

      <PageContentSection className='col-span-4 lg:col-span-3'>
        {item.map((publication, i) => (
          <div
            key={i}
            id={publication.attributes.slug}
            className='borderLight border-b py-12'
          >
            <div className='px-6 lg:px-24'>
              <div className=''>
                <PublicationTextColor
                  type={publication.attributes.type}
                  types={menuItems}
                >
                  <h1>{publication.attributes.title}</h1>
                </PublicationTextColor>
                <div className='mt-6 font-mono text-sm'>
                  <PublicationDetails
                    type={publication.attributes.type}
                    label='Type'
                    value={publication.attributes.type}
                    types={menuItems}
                  />
                  <PublicationDetails
                    type={publication.attributes.type}
                    label={t('authors')}
                    value={publication.attributes.author}
                    types={menuItems}
                  />
                  <PublicationDetails
                    type={publication.attributes.type}
                    label='Journal'
                    value={publication.attributes.journal}
                    types={menuItems}
                  />
                  <PublicationDetails
                    type={publication.attributes.type}
                    label={t('year')}
                    value={publication.attributes.year.slice(0, 4)}
                    types={menuItems}
                  />
                </div>
              </div>
              <p className='mt-12 mb-6 text-sm lg:text-base'>
                <article className='markdown'>
                  <ReactMarkdown>
                    {publication.attributes.abstract}
                  </ReactMarkdown>
                </article>
              </p>

              <ButtonIcon
                icon={DocumentTextIcon}
                label={t('read')}
                type={publication.attributes.type}
                url={publication.attributes.url}
                tagColor={publication.attributes.type}
                types={menuItems}
              />
            </div>
          </div>
        ))}
      </PageContentSection>
    </>
  );
};

export default PublicationsContent;
