import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList'
import AppBar from './AppBar';
import SignInForm from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="repository">
          <Route path=":repositoryID" element={<SingleRepository />} />
        </Route>
        <Route path="/createReview" element={<ReviewForm />} />
        <Route path="/myReviews" element={<MyReviews />} />      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;