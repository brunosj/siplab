import * as React from 'react';
import Link from 'next/link';
import PageContentSection from '@/layout/pageContentSection';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { CMS_URL } from '../../lib/constants';
import { PeopleTypes } from '@/types/ResponsesInterface';

type People = {
  people: PeopleTypes[];
};

const PeopleContent = ({ people }: People) => {
  const { t } = useTranslation();

  const peopleSorted = people.sort((a, b) =>
    a.attributes.type > b.attributes.type ? 1 : -1
  );

  return (
    <>
      <article className='col-span-4'>
        <PageContentSection className=''>
          <div className=''>
            {peopleSorted.map((people, i) => (
              <Link
                className='borderLight group flex w-full flex-col border-b  border-r py-12 pl-6 duration-300 last:border-b-0 hover:bg-mgray-200 hover:dark:bg-mblack-500 lg:pl-24 lg:pr-12'
                key={i}
                href={`/people/${people.attributes.slug}`}
              >
                <div className='col-span-7  text-mpurple-700  dark:text-mpurple-500'>
                  <p className='mb-0 text-lg lg:mb-3 lg:text-2xl'>
                    {people.attributes.name}
                  </p>
                </div>
                <div className='grid-cols-7 lg:grid'>
                  <div className='col-span-2 mt-6 '>
                    {people.attributes.photo.data && (
                      <div className='relative h-24 w-24 rounded-full grayscale duration-300 group-hover:grayscale-0 lg:h-32 lg:w-32'>
                        <Image
                          src={`${CMS_URL}${people.attributes.photo.data.attributes.url}`}
                          alt={`${CMS_URL}${people.attributes.name}`}
                          className='rounded-full  object-cover'
                          fill
                          priority
                          sizes='100vw'
                        />
                      </div>
                    )}
                  </div>
                  <div className='col-span-7 mt-6 pr-6 lg:col-span-5'>
                    <div className='grid grid-cols-7 font-mono text-sm lg:text-base'>
                      {/* Relation row */}
                      <span className='col-span-7 mb-1 text-mpurple-700 dark:text-mpurple-500 lg:col-span-2 lg:mb-0'>
                        {t('role')}
                      </span>
                      <span className='col-span-7 mb-3 ml-0 lg:col-span-5 lg:ml-3'>
                        {people.attributes.type.slice(3)}
                      </span>
                      {/* description row */}

                      <span className='col-span-7 mb-1 text-mpurple-700 dark:text-mpurple-500 lg:col-span-2 lg:mb-0'>
                        {t('description')}
                      </span>
                      <span className='col-span-7 mb-3 ml-0 lg:col-span-5 lg:ml-3'>
                        {people.attributes.projectDescription}
                      </span>

                      {/* project row */}
                      {people.attributes.research_projects.data.length >= 1 && (
                        <>
                          <span className='col-span-7 mb-1 text-mpurple-700 dark:text-mpurple-500 lg:col-span-2 lg:mb-0'>
                            {t('research')}
                          </span>
                          <div className='col-span-7 mb-3 ml-0 lg:col-span-5 lg:ml-3'>
                            <div className='flex flex-col'>
                              {people.attributes.research_projects.data.map(
                                (project, i) => (
                                  <Link
                                    href={`/research#${project.attributes.slug}`}
                                    key={i}
                                    className=' mb-2 last:mb-0'
                                  >
                                    <li className='list-inside list-disc'>
                                      {project.attributes.title}
                                    </li>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {/* tags row */}
                      {/* {people.attributes.researchInterests.length >= 1 && (
                        <>
                          <span className='col-span-7 mb-1 mt-3 text-mpurple-700 dark:text-mpurple-500 lg:col-span-2 lg:mb-0'>
                            {t('Focus')}
                          </span>
                          <div className='col-span-7 mt-3  mb-3 ml-0 lg:col-span-5 lg:ml-3'>
                            <div>
                              {people.attributes.researchInterests.map(
                                (interest, i) => (
                                  <span
                                    key={i}
                                    className='mr-12 rounded-xl border py-1 px-2  last:mr-0 '
                                  >
                                    {interest.tag}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      )} */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PageContentSection>
      </article>
    </>
  );
};

export default PeopleContent;
