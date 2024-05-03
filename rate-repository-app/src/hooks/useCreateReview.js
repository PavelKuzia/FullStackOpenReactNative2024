import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateRepository = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, review }) => {
    try {
      const data = await mutate({ variables: {review: {ownerName: ownerName, repositoryName: repositoryName, 
        rating: parseInt(rating), text: review}}});
      console.log(data);
      return data ? data.data.createReview.repositoryId : undefined;
    } catch (e) {
      console.log(e);
    }    
  };

  return [createReview, result];
};

export default useCreateRepository;