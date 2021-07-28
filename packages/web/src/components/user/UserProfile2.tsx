import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import { useGetUserProfile } from '../../../../shared/hooks/user/users';
import Loading from '../common/Loading';
import ErrorLoading from '../common/ErrorLoading';
import CreateUserProfile from './CreateUserProfile';
import DisplayUserProfile from './DisplayUserProfile';

export default function UserProfile2() {
  const { error, data, loading } = useGetUserProfile();
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(true);
  if (loading) return <Loading />;
  if (error) return <ErrorLoading error={error} />;
  const { userProfile } = data?.getUserProfile;
  if (userProfile === null || undefined) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateProfile(!showCreateProfile)}>
          Create UserProfile
        </Button>
        {showCreateProfile && <CreateUserProfile />}
      </>
    );
  } else {
    return showUserProfile ? (
      <DisplayUserProfile
        data={data}
        showUserProfile={showUserProfile}
        setShowUserProfile={setShowUserProfile}
      />
    ) : (
      <CreateUserProfile title="Update User Profile" />
    );
  }
}
