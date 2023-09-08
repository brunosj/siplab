import * as React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';
import { Seo } from '@/components/SEO';
import { useTranslation } from 'next-i18next';

const Custom404 = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo title='' description='' />
      <article className=''></article>
    </Layout>
  );
};

export default Custom404;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
}
