import { View, StyleSheet, ScrollView, Text, Pressable} from 'react-native';
import { Link } from "react-router-native";
import { GET_TOKEN } from '../graphql/queries';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99CCFF',
  },
  scrollStyle: {
    alignItems: 'center',
    justifyContent: "space-evenly" 
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  links: {
    fontWeight: 'bold',
    fontSize: 19
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_TOKEN);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();    
    apolloClient.resetStore();
    navigate("/");
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={ styles.scrollStyle }>
      <View style={styles.tabsContainer}>
        <Link to='/repositories'>
            <Text style={styles.links}>Repositories</Text>
        </Link>
        {!data?.me && 
        <Link to='/signin'>
            <Text style={styles.links}>Sign In</Text>
        </Link>
        }
        {!data?.me && 
        <Link to='/signup'>
            <Text style={styles.links}>Sign Up</Text>
        </Link>
        }
        {data?.me && 
        <Link to='/createReview'>
          <Text style={styles.links}>Create a review</Text>
        </Link>
        }
        {data?.me && 
        <Link to='/myReviews'>
          <Text style={styles.links}>My Reviews</Text>
        </Link>
        }
        {data?.me && 
        <Pressable onPress={signOut}>
          <Text style={styles.links}>Sign Out</Text>
        </Pressable>
        }        
      </View>
    </ScrollView>   
  </View>
  )
};

export default AppBar;