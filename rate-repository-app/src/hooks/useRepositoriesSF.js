import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES_WITH_SORTING_AND_FILTER} from '../graphql/queries';

const useRepositoriesSortAndFilter = ({orderBy, orderDirection, searchKeyword}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_WITH_SORTING_AND_FILTER, 
    {fetchPolicy: 'cache-and-network', 
    variables: {orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword}}
  );
  const repositories = data ? data.repositories : undefined;
  return { repositories, error, loading };
};

export default useRepositoriesSortAndFilter;