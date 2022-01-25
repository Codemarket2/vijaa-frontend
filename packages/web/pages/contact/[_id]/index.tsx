import React from 'react';
import { useRouter } from 'next/router';
import UserLayout from '../../../src/components/common/UserLayout';
import ErrorLoading from '../../../src/components/common/ErrorLoading';

export default function index() {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <UserLayout container={false} authRequired>
      {_id ? (
        <div>
          <h2>{_id}</h2>
        </div>
      ) : (
        <ErrorLoading />
      )}
    </UserLayout>
  );
}
