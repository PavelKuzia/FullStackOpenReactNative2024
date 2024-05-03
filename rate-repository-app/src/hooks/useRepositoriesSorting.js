import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES_WITH_SORTING} from '../graphql/queries';

const useRepositoriesSorting = ({orderBy, orderDirection}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_WITH_SORTING, 
    {fetchPolicy: 'cache-and-network', 
    variables: {orderBy: orderBy, orderDirection: orderDirection}}
  );
  const repositories = data ? data.repositories : undefined;
  return { repositories, error, loading };
};

export default useRepositoriesSorting;