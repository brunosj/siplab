import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PageNavigationSection from '@/layout/pageNavigationSection';
import PageContentSection from '@/layout/pageContentSection';
import ResearchListing from './researchListing';
import { ResearchTypes } from '@/types/ResponsesInterface';

type ResearchProjects = {
  researchProjects: ResearchTypes[];
};

const ResearchContent = ({ researchProjects }: ResearchProjects) => {
  const { t } = useTranslation();

  const menuItems = [
    ...new Set(researchProjects.map((project) => project.attributes.type)),
  ];

  const [item, setItem] = useState(researchProjects);

  const filterItem = (filteredType: {}) => {
    const newItem = researchProjects.filter((project) => {
      return project.attributes.type === filteredType;
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

  const initialState = (researchProjects: any) => (
    setItem(researchProjects), scrollTop()
  );

  useEffect(() => {
    setItem(researchProjects);
  }, [researchProjects]);

  return (
    <>
      <PageNavigationSection pageNavigationTitle={t('projectTypes')}>
        <div className=''>
          <div>
            <button
              className='textHover py-3'
              aria-label='all items'
              onClick={() => initialState(researchProjects)}
            >
              <div className='text-left'>{t('allProjects')}</div>
            </button>
          </div>
          {menuItems.map((type, i) => {
            return (
              <button
                className='textHover flex py-3 active:underline'
                aria-label='choose category'
                onClick={() => {
                  clickEvent(type);
                }}
                key={i}
              >
                <div className='text-left'>{type}</div>
              </button>
            );
          })}
        </div>
      </PageNavigationSection>
      <PageContentSection className='col-span-4 lg:col-span-3 '>
        <ResearchListing researchProjects={item} />
      </PageContentSection>
    </>
  );
};

export default ResearchContent;
