/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import USER_MUTATION from '../graphql/mutation/user';
import { userSubscriptionData } from '../redux/actions/auth';

interface IState {
  step: string;
  role: string | null;
}

const subscriptions = {
  annual: {
    subscriptionType: 'annual',
    description: 'Annual (Best Value) $315 First 14 days free',
    amount: 315,
    expiringOn: moment().add(1, 'years'),
  },
  monthly: {
    subscriptionType: 'monthly',
    description: 'Monthly $29 First 7 days free',
    amount: 29,
    expiringOn: moment().add(1, 'months'),
  },
  trial: {
    subscriptionType: 'trial',
    description: 'try free and subscribe',
    amount: 0,
    expiringOn: moment().add(1, 'weeks'),
  },
};

export const useOnBoarding = () => {
  const [state, setState] = useState<IState>({ step: 'onboardingStart', role: null });
  const [updateUserSubcription] = useMutation(USER_MUTATION.UPDATE_USER_SUBCRIPTION);
  const dispatch = useDispatch();
  const handleSelectRole = (role: string) => {
    if(role === 'coach')
    setState({ ...state, role, step: 'coachOnboardStepOne' });

    if(role === 'client')
    setState({ ...state, role, step: 'clientOnboardStepOne' });
  };

  const handleCoachOnboardStepOneContinueButton = (step: string) => {
    setState({ ...state, step });
  };
  const handleClientOnboardStepOneContinueButton = (step: string) => {
    setState({ ...state, step });
  };
  const handleSubscribe = async (subscriptionType) => {
    const { data } = await updateUserSubcription({
      variables: {
        userId: 'vivekvt',
        updatedBy: 'vivekvt',
        subscription: {
          ...subscriptions[subscriptionType],
          subscribedOn: new Date(),
          active: true,
        },
      },
    });
    if (data && data.updateUser) {
      dispatch(userSubscriptionData(data.updateUser));
    }
  };

  return { state, 
    handleSelectRole, 
    handleCoachOnboardStepOneContinueButton, 
    handleClientOnboardStepOneContinueButton,
    handleSubscribe };
};

export const useCancelSubscription = () => {
  const [cancelUserSubcription] = useMutation(USER_MUTATION.CANCEL_USER_SUBCRIPTION);
  const dispatch = useDispatch();

  const handleCancelSubscribe = async () => {
    const { data } = await cancelUserSubcription({
      variables: {
        userId: 'vivekvt',
        updatedBy: 'vivekvt',
      },
    });
    if (data && data.cancelUserSubscription) {
      dispatch(userSubscriptionData(data.cancelUserSubscription));
    }
  };

  return { handleCancelSubscribe };
};
