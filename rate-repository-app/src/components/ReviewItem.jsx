import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { format } from 'date-fns'
import theme from '../theme';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from '../graphql/mutations';
import useGetCurrentUserWithReviews from '../hooks/useGetCurrentUserWithReviews';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 15
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginRight: 20,
    flexGrow: 1,
    flexShrink: 1
  },
  rating: {
    width: 50,
    height: 50,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 25,
    paddingTop: 15,
    borderColor: theme.colors.primary
  },
  username: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body
  },
  submitViewButton: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 170,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  subContainerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginRight: 20,
    flexGrow: 1,
    flexShrink: 1
  },
  submitText: {
    color: "white",
    fontSize: 15
  },
  submitDeleteButton: {
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 170,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8
  }
});

const ReviewItem = ({ review, myReviews }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);
  const {refetch} = useGetCurrentUserWithReviews();

  const handleViewRepository = () => {
    const repositoryID = review.id.split('.').slice(1, 3).join('.')
    navigate(`/repository/${repositoryID}`);
  }

  const onDeleteReview = async () => {
    try {
      await mutate({ variables: {deleteReviewId: review.id.toString()}});
      refetch();
    } catch (e) {
      console.log(e);
    }    
  }

  const handleDeleteReview = () => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Delete',
        onPress: () => onDeleteReview(),
        style: 'delete',
      },
      {
        text: 'Cancel',
      }      
    ]);
  }

  return (
    <View>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{format(review.createdAt, 'dd.MM.yy')}</Text>
          <Text>{review.text}</Text>        
        </View>      
      </View>
      {myReviews && (
        <View style={styles.subContainerButtons}>
          <Pressable onPress={handleViewRepository} style={styles.submitViewButton}>
            <Text style={styles.submitText}>View Repository</Text>
          </Pressable>
          <Pressable onPress={handleDeleteReview} style={styles.submitDeleteButton}>
            <Text style={styles.submitText}>Delete Review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
};

export default ReviewItem;