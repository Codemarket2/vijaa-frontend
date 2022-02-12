import { useRouter } from 'next/router';
import UserLayout from '../../../../src/components/common/UserLayout';
import ResponseScreen from '../../../../src/screens/ResponseScreen';
import { useEffect, useState } from 'react';
import { QRCodeGenerator } from '../../../../src/components/qrcode/QRCode';

export default function Page() {
  const router = useRouter();
  const { count, slug } = router.query;
  const [currUrl, setCurrUrl] = useState('');

  useEffect(() => {
    setCurrUrl(window.location.href);
  }, [slug]);

  return (
    <UserLayout authRequired>
      <QRCodeGenerator url={currUrl} />;
      {slug && <ResponseScreen slug={slug?.toString()} count={count?.toString()} />}
    </UserLayout>
  );
}
