import { FlatList, StyleSheet, View, Text } from 'react-native';
import ReviewItem from './ReviewItem';
import useGetCurrentUserWithReviews from '../hooks/useGetCurrentUserWithReviews';

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const {reviews, loading} = useGetCurrentUserWithReviews();
  const reviewsNodes = reviews ? reviews.map((edge) => edge.node) : [];

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>  
    )
  }
  return (
    <FlatList
      data={reviewsNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReviews={true}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default MyReviews;