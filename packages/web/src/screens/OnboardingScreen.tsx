import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useOnBoarding } from '@frontend/shared/hooks/onBoarding';
import OnboardingStart from '../components/onboarding/OnboardingStart';
import CoachOnboardStepOne from '../components/onboarding/CoachOnboardStepOne';
import CoachOnboardStepTwo from '../components/onboarding/CoachOnboardStepTwo';
import ClientOnboardStepOne from '../components/onboarding/ClientOnboardStepOne';
import ClientOnboardStepTwo from '../components/onboarding/ClientOnboardStepTwo';

export default function OnBoarding() {
  const user = useSelector(({ auth }: any) => auth.user);
  const { state, 
    handleCoachOnboardStepOneContinueButton , 
    handleClientOnboardStepOneContinueButton ,
    handleSelectRole, 
    handleSubscribe } = useOnBoarding();
  const router = useRouter();

  useEffect(() => {
    // console.log(user);
    if (user && user.subscription && user.subscription.active) {
      router.push('/dashboard');
    }
  }, [user]);

  if (state.step === 'coachOnboardStepOne') {
    return <CoachOnboardStepOne handleCoachOnboardStepOneContinueButton ={handleCoachOnboardStepOneContinueButton } />;
  }
  if (state.step === 'clientOnboardStepOne') {
    return <ClientOnboardStepOne handleClientOnboardStepOneContinueButton ={handleClientOnboardStepOneContinueButton } />;
  }
  if (state.step === 'coachOnboardStepTwo') {
    return <CoachOnboardStepTwo handleSubscribe={handleSubscribe} />;
  }
  if (state.step === 'clientOnboardStepTwo') {
    return <ClientOnboardStepTwo handleSubscribe={handleSubscribe} />;
  }
  return <OnboardingStart handleSelectRole={handleSelectRole} />;
}
