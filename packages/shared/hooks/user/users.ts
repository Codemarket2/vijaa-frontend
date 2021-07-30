import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import USER_MUTATION from '../../graphql/mutation/user';
import { GET_USER, GET_USERS, GET_USER_PROFILE, GET_ABOUT } from '../../graphql/query/user';
import { guestClient } from '../../graphql';
import { now } from 'moment';
import { date, string } from 'yup/lib/locale';

export function useGetOneUser({ _id }: any) {
  const [state, setState] = useState({ data: null, loading: false, error: null });
  useEffect(() => {
    setState({ ...state, loading: true });
    guestClient
      .query({
        query: GET_USER,
        variables: {
          _id: _id,
        },
      })
      .then(({ data }) => setState({ ...state, data, loading: false }))
      .catch((error) => setState({ ...state, error, loading: false }));
  }, []);
  return state;
}

export function useUpdateUserProfile() {
  const [state, setState] = useState({
    cancerType: '',
    dateOfDiagnose: new Date(),
    doctors: [{ name: '', hospital: '' }],
    symptoms: [],
  });

  const resetInput = () => {
    setState({
      cancerType: '',
      dateOfDiagnose: new Date(),
      doctors: [{ name: '', hospital: '' }],
      symptoms: [],
    });
  };
  const [handleUpdateUserProfile, { data, loading, error }] = useMutation(
    USER_MUTATION.UPDATE_USER_PROFILE,
    {
      onCompleted: resetInput,
    },
  );

  return {
    state,
    setState,
    handleUpdateUserProfile,
    data,
    loading,
    error,
  };
}

export function useAbout() {
  function createAbout() {
    const [handleCreateAbout, { data, error, loading }] = useMutation(USER_MUTATION.CREATE_ABOUT, {
      refetchQueries: [{ query: GET_ABOUT }],
    });
    return { handleCreateAbout, data, error, loading };
  }
  function getAbout() {
    const { loading, error, data } = useQuery(GET_ABOUT);
    return {
      loading,
      error,
      data,
    };
  }
  return {
    createAbout,
    getAbout,
  };
}

export function useGetUserProfile() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  return {
    loading,
    error,
    data,
  };
}

export function useGetAllUser() {
  // { lowerRange, higherRange, active }
  const [updateUserStatusMutation] = useMutation(USER_MUTATION.UPDATE_STATUS);
  const [filter, setFilter] = useState({
    active: null,
    block: false,
    limit: 20,
    page: 1,
    search: '',
    sortBy: '-createdAt',
    lowerRange: null,
    higherRange: null,
  });

  const { loading, data, error } = useQuery(GET_USERS, {
    variables: {
      ...filter,
      // lowerRange,
      // higherRange,
      // active,
    },
    fetchPolicy: 'network-only', // 'cache-and-network' //'network-only'
  });

  // console.log('Error', data, error);

  const [allData, setAllData] = useState({
    count: 0,
    users: [],
  });

  const adminId = useSelector(({ auth }: any) => (auth.authenticated ? auth.attributes.sub : null));

  useEffect(() => {
    if (data && data.getUsers) {
      if (filter.page > 1) {
        setAllData({ ...allData, users: [...allData.users, ...data.getUsers.users] });
      } else {
        setAllData(data.getUsers);
      }
    }
  }, [data]);

  const handleUpdateUserStatus = async (userId: string, status: boolean) => {
    await updateUserStatusMutation({
      variables: {
        userId,
        status,
        updatedBy: adminId,
      },
    });
    setAllData({
      ...allData,
      users: allData.users.map((u) => (u.userId === userId ? { ...u, active: status } : u)),
    });
  };

  return { filter, setFilter, allData, loading, handleUpdateUserStatus };
}
