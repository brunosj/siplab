import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import OutreachTextColor from '@/ui/outreachTextColor';
import PageContentSection from '@/layout/pageContentSection';
import { useTranslation } from 'next-i18next';
import { OutreachTypes } from '@/types/ResponsesInterface';

type Outreach = {
  outreach: OutreachTypes[];
};

const OutreachContent = ({ outreach }: Outreach) => {
  const { t } = useTranslation();

  const outreachTypes = [
    ...new Set(outreach.map((item) => item.attributes.type)),
  ];

  const [item, setItem] = useState(outreach);

  const filterItem = (filteredType: {}) => {
    const newItem = outreach.filter((item) => {
      return item.attributes.type === filteredType;
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

  const initialState = (outreach: any) => (setItem(outreach), scrollTop());
  const initialStateMobile = (outreach: any) => setItem(outreach);

  useEffect(() => {
    setItem(outreach);
  }, [outreach]);

  return (
    <>
      <article className='col-span-4'>
        <nav className='borderLight  top-12 border-b bg-mgray-300 text-xs font-light dark:bg-mblack-700 lg:sticky lg:text-base '>
          <div className='grid grid-cols-2 flex-wrap justify-between gap-x-12 gap-y-3 py-6 px-6 lg:flex lg:px-24'>
            <div className='flex items-center'>
              <OutreachTextColor types={outreachTypes} type='All items'>
                <input
                  className='h-4 w-4 border-gray-300'
                  onClick={() => initialStateMobile(outreach)}
                  name='outreach type'
                  type='radio'
                />
              </OutreachTextColor>
              <label className='ml-3 block'>{t('allItems')}</label>
            </div>
            {outreachTypes.map((type, i) => {
              return (
                <div className='flex items-center' key={i}>
                  <OutreachTextColor type={type} types={outreachTypes}>
                    <input
                      className='h-4 w-4 border-gray-300 '
                      onClick={() => {
                        filterItem(type);
                      }}
                      name='outreach type'
                      type='radio'
                    />
                  </OutreachTextColor>
                  <label htmlFor={String(i)} className='ml-3 block'>
                    {type}
                  </label>
                </div>
              );
            })}
          </div>
        </nav>
        <PageContentSection className='py-6 lg:py-0'>
          <div className='grid-cols-2 justify-between lg:grid'>
            {item.map((outreach, i) => (
              <>
                {outreach.attributes.urlConference && (
                  <Link
                    href={outreach.attributes.urlConference}
                    key={i}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='borderLight group w-full border-b border-r py-12 duration-300 last:border-b-0 hover:bg-mgray-200 hover:dark:bg-mblack-500 '
                  >
                    <div className='borderLight border-b px-6 pb-6 lg:border-none lg:px-24 lg:pb-0'>
                      <OutreachTextColor
                        type={outreach.attributes.type}
                        types={outreachTypes}
                      >
                        <p className='mb-3 font-mono text-base uppercase lg:text-lg'>
                          {outreach.attributes.type}
                        </p>
                      </OutreachTextColor>
                      <h1 className='textHover'>{outreach.attributes.title}</h1>
                      <p className='mt-3 text-sm'>
                        {t('by')} {outreach.attributes.author}
                      </p>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </div>
        </PageContentSection>
      </article>
    </>
  );
};

export default OutreachContent;
