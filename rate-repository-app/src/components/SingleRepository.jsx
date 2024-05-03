import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_WITH_REVIEWS } from '../graphql/queries';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repositoryID } = useParams();
  
  const id = {'id': String(repositoryID)};
  const { data, loading } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {variables: id, fetchPolicy: 'cache-and-network'});

  const repository = data ? data.repository : undefined;
  const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo item={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;