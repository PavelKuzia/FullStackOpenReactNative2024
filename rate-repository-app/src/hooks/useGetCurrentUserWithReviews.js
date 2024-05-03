import { useQuery } from '@apollo/client';
import {GET_CURRENT_USER} from '../graphql/queries';

const useGetCurrentUserWithReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, 
    {fetchPolicy: 'cache-and-network', 
    variables: {includeReviews: true}}
  );
  const reviews = data ? data.me.reviews.edges : undefined;
  return { reviews, error, loading, refetch };
};

export default useGetCurrentUserWithReviews;