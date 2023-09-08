import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NewspaperIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { NewsTypes, ProjectTypes } from '@/types/ResponsesInterface';

interface Props {
  heading: string;
  items: NewsTypes[] | ProjectTypes[];
  contentType: 'News' | 'Projects';
}

const HeroListing = ({ heading, contentType, items }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='w-full lg:w-1/3 pb-12 lg:pb-0'>
      <h2>{heading}</h2>
      <ul className='space-y-6 padTop12'>
        {items.map((item, i) => (
          <li key={i} className='space-y-2'>
            <div className='flex space-x-2 lg:space-x-6 items-center'>
              {contentType === 'News' ? (
                <NewspaperIcon className='w-6 h-6 lg:w-8 lg:h-8 shrink-0' />
              ) : (
                <BeakerIcon className='w-6 h-6 lg:w-8 lg:h-8 shrink-0' />
              )}
              <h4>{item.attributes.title}</h4>
            </div>
            <p>{item.attributes.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroListing;
