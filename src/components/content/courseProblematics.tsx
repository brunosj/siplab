import { siteMetadata } from '@/utils/siteMetadata';
import ButtonIcon from '@/ui/buttonIcon';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';
import { ProblematicTypes } from '@/types/ResponsesInterface';

type Problematics = {
  problematics: ProblematicTypes[];
};
const CourseProblematics = ({ problematics }: Problematics) => {
  const { t } = useTranslation();
  return (
    <div>
      {problematics.map((problematic, i) => {
        return (
          <div key={i} className='mt-1'>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='group relative flex w-full items-center justify-between  bg-mgray-500 py-6 px-6 text-left font-semibold dark:bg-mblack-500 lg:px-12'>
                    <p className='font-mono text-xs uppercase text-mturquoise-700  duration-300 dark:text-mturquoise-500 group-hover:dark:text-mgray-500 lg:text-sm'>
                      {problematic.attributes.title}
                    </p>
                    <ChevronRightIcon
                      className={
                        open
                          ? 'h-3 w-3 rotate-90 transform text-mturquoise-700 dark:text-mturquoise-500'
                          : 'h-3 w-3 text-mturquoise-700  dark:text-mturquoise-500 group-hover:dark:text-mgray-500'
                      }
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className='bg-mgray-500 dark:bg-mblack-500'>
                    <div className='px-6 pb-6 text-xs lg:px-12 lg:text-sm'>
                      <div className='markdownSmallText'>
                        <ReactMarkdown>
                          {problematic.attributes.content}
                        </ReactMarkdown>
                      </div>

                      {problematic.attributes.pdf.data && (
                        <div className='my-3'>
                          <ButtonIcon
                            icon={DocumentTextIcon}
                            label={t('read')}
                            url={`${siteMetadata.cmsUrl}${problematic.attributes.pdf.data[0].attributes.url}`}
                            type='Scientific articles'
                            // using this types array is a workaround to color the READ button to the turquoise color (since colors are dynamically assigned, we need to pass an array although we only need one value)
                            types={[
                              'Scientific articles',
                              'Scientific articles',
                              'Scientific articles',
                            ]}
                          />
                        </div>
                      )}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        );
      })}
    </div>
  );
};

export default CourseProblematics;
