import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { BlogTypes } from '@/types/ResponsesInterface';
import PageContentSection from '../layout/pageContentSection';

type Blogs = {
  blogs: BlogTypes[];
};
const BlogPreviews = ({ blogs }: Blogs) => {
  const { t } = useTranslation();

  // const router = useRouter();
  // const activeLanguage = router.locale;

  // let blogPath = '';
  // if (typeof window !== 'undefined') {
  //   const windowUrl = window.location.href;
  //   if (activeLanguage === 'fr') {
  //     blogPath = windowUrl.replace('fr/', '');
  //     console.log(blogPath);
  //   }
  // }

  return (
    <>
      {/* <PageNavigationSection
        pageNavigationTitle={t('blogPosts')}
        className='hidden lg:block'
      >
        {blogs.map((blog, i) => (
          <div key={i} className='py-6 '>
            <Link href={`#${blog.attributes.slug}`}>
              <h2 className='textHover text-mpurple-700 dark:text-mpurple-500'>
                {blog.attributes.title}
              </h2>
            </Link>
          </div>
        ))}
      </PageNavigationSection> */}
      <PageContentSection className='col-span-4'>
        {blogs.map((blog, i) => (
          <Link
            href={`blog/${blog.attributes.slug}`}
            key={i}
            className=' borderLight group w-full border-b py-12 duration-300 last:border-b-0 hover:bg-mgray-200 hover:dark:bg-mblack-500  '
          >
            <div className='borderLight border-b py-12 px-6 lg:px-24'>
              <h1 className='text-mpurple-700 dark:text-mpurple-500'>
                {blog.attributes.title}
              </h1>
              <p className='textHover mt-6'>{blog.attributes.description}</p>
            </div>
          </Link>
        ))}
      </PageContentSection>
    </>
  );
};

export default BlogPreviews;
