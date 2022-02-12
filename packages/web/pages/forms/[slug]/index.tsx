import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useRouter } from 'next/router';
import UserLayout from '../../../src/components/common/UserLayout';
import ErrorLoading from '../../../src/components/common/ErrorLoading';
import NotFound from '../../../src/components/common/NotFound';
import Form from '../../../src/components/form2/Form';
import { useEffect, useState } from 'react';
import { QRCodeGenerator } from '../../../src/components/qrcode/QRCode';

export default function Page(): any {
  const router = useRouter();
  const { slug } = router.query;
  const [currUrl, setCurrUrl] = useState('');

  useEffect(() => {
    setCurrUrl(window.location.href);
  }, [slug]);

  const onSlugChange = (newSlug) => {
    if (slug !== newSlug) {
      router.push(`/forms/${newSlug}`);
    }
  };

  return (
    <UserLayout container={false} authRequired>
      <QRCodeGenerator url={currUrl} />;
      {slug ? <FormPage slug={slug.toString()} onSlugChange={onSlugChange} /> : <ErrorLoading />}
    </UserLayout>
  );
}

const FormPage = ({ slug, onSlugChange }: { slug: string; onSlugChange: any }) => {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  return <Form _id={data?.getFormBySlug?._id} onSlugChange={onSlugChange} />;
};
