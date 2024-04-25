import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: {credentials: {username: username, password: password}}});
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      return true;
    } catch (e) {
      return false;
    }    
  };

  return [signIn, result];
};

export default useSignIn;