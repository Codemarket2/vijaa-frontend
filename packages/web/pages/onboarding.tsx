import React from 'react';
import OnboardingScreen from '../src/screens/OnboardingScreen';
import UserLayout from '../src/components/common/UserLayout';

export default function OnboardingPage() {
  return (
    <UserLayout authRequired>
      <OnboardingScreen />
    </UserLayout>
  );
}
