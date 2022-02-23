import { useMutation } from '@apollo/client';
import { CREATE_MAILING_LIST } from '../../graphql/mutation/email';

export function useCreateMailingList() {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_MAILING_LIST);

  const handleCreateList = async (payload: any) => {
    try {
      const res = await createMutation({
        variables: payload,
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return { handleCreateList, createLoading };
}
