import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PublicationTypes } from '@/types/ResponsesInterface';

type Publications = {
  publications: PublicationTypes[];
};
const PublicationListing = ({ publications }: Publications) => {
  return (
    <>
      {publications.map((publication, i) => (
        <Link
          key={i}
          className='textHover group mb-6 flex items-center'
          rel='noopener noreferrer'
          target='_blank'
          href={publication.attributes.url}
        >
          <DocumentTextIcon className='h-8 w-8 flex-shrink-0 lg:h-6 lg:w-6' />
          <p className='ml-3 text-sm lg:text-base'>
            {publication.attributes.title}
          </p>
        </Link>
      ))}
    </>
  );
};

export default PublicationListing;
