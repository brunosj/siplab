import * as React from 'react';
import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import PageNavigationTitle from '@/layout/pageNavigationTitle';
import PublicationListing from './publicationListing';
import PeopleListing from './peopleListing';
import { ResearchTypes } from '@/types/ResponsesInterface';

type ResearchProjects = {
  researchProjects: ResearchTypes[];
};

const ResearchListing = ({ researchProjects }: ResearchProjects) => {
  const { t } = useTranslation();

  return (
    <>
      {researchProjects.map((project, i) => {
        return (
          <div
            key={i}
            className='borderLight  layout  border-b pt-12 pb-6 last:border-0'
          >
            <div className='anchor' id={project.attributes.slug} />

            <div className=''>
              <span className='font-mono  text-xs uppercase text-mgray-700 lg:text-sm'>
                {project.attributes.type}
              </span>
              <h1 className='mt-2 text-mpurple-700 dark:text-mpurple-500'>
                {project.attributes.title}
              </h1>
              <div className='py-6 font-mono text-sm lg:text-base '>
                <p>
                  {project.attributes.isCompleted === true
                    ? `${t('project')} ${t('completed')}
                  `
                    : `${t('project')} ${t('inProgress')}`}
                </p>
                <ReactMarkdown className='markdownSmallText mt-1 font-mono'>
                  {project.attributes.description}
                </ReactMarkdown>
              </div>
            </div>
            <div className='lg:py-6'>
              {project.attributes.content && (
                <article className='markdown'>
                  <ReactMarkdown>{project.attributes.content}</ReactMarkdown>
                </article>
              )}
            </div>
            {project.attributes.publication_items.data.length >= 1 && (
              <div className='pt-6'>
                <PageNavigationTitle
                  title='Publications'
                  textColor='text-mpurple-700 dark:text-mpurple-500'
                />
                <div className='mt-6'>
                  <PublicationListing
                    publications={project.attributes.publication_items.data}
                  />
                </div>
              </div>
            )}
            <div className='py-6'>
              {project.attributes.people_items.data.length >= 1 && (
                <section className='w-full '>
                  <PageNavigationTitle
                    title={t('people')}
                    textColor='text-mpurple-700 dark:text-mpurple-500'
                  />
                  <div className='mt-6 flex flex-wrap'>
                    <PeopleListing
                      people={project.attributes.people_items.data}
                    />
                  </div>
                </section>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ResearchListing;
