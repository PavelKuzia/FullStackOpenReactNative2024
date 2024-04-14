import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text'

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
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={ styles.scrollStyle }>
      <View style={styles.tabsContainer}>
        <Link to='/repositories'>
            <Text color='primary' fontWeight='bold' fontSize='header'>Repositories</Text>
        </Link>
        <Link to='/signin'>
            <Text color='primary' fontWeight='bold' fontSize='header'>Sign In</Text>
        </Link>
      </View>
    </ScrollView>   
  </View>
  )
};

export default AppBar;