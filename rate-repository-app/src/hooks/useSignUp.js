import { useMutation } from "@apollo/client";
import { CREATE_USER } from '../graphql/mutations';


const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const signUp = async ({username, password}) => {
    try {
      await mutate({ variables: {user: {username: username, password: password}}});
    } catch (e) {
      console.log(e);
    }
  }
  return [signUp, result];
}

export default useSignUp;