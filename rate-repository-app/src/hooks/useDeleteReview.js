import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from '../graphql/mutations';


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const deleteReview = async ({id}) => {
    try {
      await mutate({ variables: {deleteReviewId: id.toString()}});
    } catch (e) {
      console.log(e);
    }
  }
  return [deleteReview, result];
}

export default useDeleteReview;