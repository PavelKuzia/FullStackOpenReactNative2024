import { useQuery } from '@apollo/client';
import {GET_REVIEWS_PAGINATION} from '../graphql/queries';

const useReviews = (args) => {
  const { data, loading, fetchMore, error} = useQuery(GET_REVIEWS_PAGINATION, {
      variables: args
  });
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...args,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    error,
  };
};

export default useReviews;