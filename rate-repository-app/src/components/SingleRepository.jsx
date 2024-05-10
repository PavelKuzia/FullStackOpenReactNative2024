import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import { useParams } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repositoryID } = useParams();

  const { repository, fetchMore, loading } = useReviews({
    repositoryId: String(repositoryID),
    first: 2,
    after: ""
  })

  const onEndReach = () => {
    fetchMore();
  };

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
      onEndReach={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;