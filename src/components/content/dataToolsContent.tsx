import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { ResourceTypes } from '@/types/ResponsesInterface';
import Link from 'next/link';

type Data = {
  data: ResourceTypes[];
};

const DataToolsContent = ({ data }: Data) => {
  const { t } = useTranslation();

  const resourcesByCategory: { [key: string]: ResourceTypes[] } =
    useMemo(() => {
      return data
        ? data.reduce((group, resource) => {
            const category =
              resource.attributes.data_tool_category.data.attributes.title;
            const description =
              resource.attributes.data_tool_category.data.attributes
                .description;
            group[category] = group[category] ?? [];
            group[category].push({ ...resource, description });
            return group;
          }, {} as { [key: string]: ResourceTypes[] })
        : {};
    }, [data]);

  const resourcesArray = useMemo(() => {
    return resourcesByCategory ? Object.entries(resourcesByCategory) : [];
  }, [resourcesByCategory]);

  const groupedResources = resourcesArray.filter(
    (resource) =>
      resource[0].toLowerCase() !== 'others' &&
      resource[0].toLowerCase() !== 'autres'
  );

  const otherResources = resourcesArray.filter(
    (resource) =>
      resource[0].toLowerCase() === 'others' ||
      resource[0].toLowerCase() === 'autres'
  );
  const resourcesTypes = [...new Set(groupedResources.map((item) => item[0]))];

  const [item, setItem] = useState(groupedResources);

  const filterItem = (filteredType: {}) => {
    const newItem = groupedResources.filter((item) => {
      return item[0] === filteredType;
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

  const initialState = (resourcesArray: any) => (
    setItem(resourcesArray), scrollTop()
  );
  const initialStateMobile = (resourcesArray: any) => setItem(resourcesArray);

  useEffect(() => {
    setItem(resourcesArray);
  }, [resourcesArray]);

  return (
    <>
      <section className='borderLight w-full table-auto border-t pb-12'>
        <nav className='borderLight  border-b bg-mgray-300 text-xs font-light dark:bg-mblack-700 lg:block lg:text-base'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-3 py-6 px-6 lg:px-24'>
            <div className='flex items-center'>
              <div className='accent-myellow-500'>
                <input
                  className='h-4 w-4 border-gray-300 '
                  onClick={() => initialStateMobile(resourcesArray)}
                  name='outreach type'
                  type='radio'
                />
              </div>
              <label className='ml-3 block'>{t('allItems')}</label>
            </div>
            {resourcesTypes.map((type, i) => {
              return (
                <div className='flex items-center' key={i}>
                  <div className='accent-myellow-500'>
                    <input
                      className='h-4 w-4 border-gray-300 '
                      onClick={() => {
                        filterItem(type);
                      }}
                      name='outreach type'
                      type='radio'
                    />
                  </div>
                  <label htmlFor={String(i)} className='ml-3 block'>
                    {type}
                  </label>
                </div>
              );
            })}
            <div className='flex items-center'>
              <div className='accent-myellow-500'>
                <input
                  className='h-4 w-4 border-gray-300 '
                  onClick={() => initialStateMobile(otherResources)}
                  name='outreach type'
                  type='radio'
                />
              </div>
              <label className='ml-3 block'>
                {String(otherResources.flat()[0])}
              </label>
            </div>
          </div>
        </nav>
        <div>
          {/* <DataToolsCategories categories={item} /> */}

          {item.map((item, i) => {
            const category = item[0] as string;
            const description = item[1][0].description;
            const resources = item.slice(1).flat();
            return (
              <div key={i} className='' id={category}>
                <div className='bg-myellow-700 py-2 text-mgray-200 dark:bg-myellow-500 dark:text-mblack-500'>
                  <h2 className='layout font-mono font-bold uppercase'>
                    {category}
                  </h2>
                </div>
                <div className='borderLight border-b bg-mgray-500 py-2 dark:bg-mblack-500'>
                  <h4 className='layout mt-2 font-mono text-sm font-light italic md:text-base'>
                    {description}
                  </h4>
                </div>
                <div className='layout borderLight hidden grid-cols-6 gap-12 border-b py-3  font-semibold text-myellow-700 dark:text-myellow-500 lg:grid'>
                  <span className='col-span-3 font-mono'>{t('name')}</span>
                  <span className='col-span-3'>{t('description')}</span>
                </div>
                {resources.map((resource: any, i: number) => (
                  <Link
                    className='layout borderLight textHover divide group flex grid-cols-6 flex-col gap-6 border-b py-3 duration-300  hover:bg-mgray-200 hover:dark:bg-mblack-500 lg:grid lg:items-center lg:gap-12'
                    href={resource.attributes.url}
                    rel='noopener noreferrer'
                    target='_blank'
                    key={i}
                  >
                    <p className='lg::text-mblack-500 col-span-3 font-mono text-lg text-myellow-700 duration-300 group-hover:text-myellow-700 dark:text-myellow-500 dark:group-hover:text-myellow-500 lg:text-mblack-500 lg:dark:text-mgray-500 '>
                      {resource.attributes.title}
                    </p>
                    <p className='col-span-3 text-sm lg:text-base'>
                      {resource.attributes.description}
                    </p>
                    {/* <span className='hidden lg:inline'>
                      {formatString(item.attributes.type)}
                    </span> */}
                  </Link>
                ))}
              </div>
            );
          })}
          {/* <DataToolsCategories data={otherResources} /> */}
        </div>
      </section>
    </>
  );
};

export default DataToolsContent;
