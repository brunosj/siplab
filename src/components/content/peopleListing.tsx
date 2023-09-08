import Link from 'next/link';
import Image from 'next/image';
import { CMS_URL } from 'src/lib/constants';
import { PeopleTypes } from '@/types/ResponsesInterface';

type People = {
  people: PeopleTypes[];
};
const PeopleListing = ({ people }: People) => {
  return (
    <>
      {people.map((people, i) => (
        <Link
          href={`/people/${people.attributes.slug}`}
          className='group flex w-full items-center gap-6 pb-6 lg:w-1/2'
          key={i}
        >
          {people.attributes.photo.data && (
            <div className=' relative h-16 w-16 flex-shrink-0 rounded-full grayscale duration-300 group-hover:grayscale-0 '>
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
          <span className='textHover block text-sm lg:text-base'>
            {people.attributes.name}
          </span>
        </Link>
      ))}
    </>
  );
};

export default PeopleListing;
