import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  containerInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    marginTop: 10,
    marginLeft: 30
  },
  logo: {
    width: 66,
    height: 58,
    marginLeft: 5,
    marginTop: 5
  },
  textContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  userName: {
    fontWeight: theme.fontWeights.bold
  },
  description: {
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.font,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textSecondary,
    marginTop: 5,
    marginBottom: 5
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  language: {
    color: theme.colors.white
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 5
  },
  submitText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.header
  }
});

const RepositoryInfo = ({item}) => {
  const format = (i) => {
    const number = i / 1000
    return number.toFixed(1) + 'k'
  }

  const openURL = () => {
    Linking.openURL(item.url);
  }

  return (
    <View>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri: item.ownerAvatarUrl}}/>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.language}>{item.language}</Text>
            </View> 
          </View>      
        </View>
      <View style={styles.containerInfo}>
        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: theme.fontWeights.bold }}>{format(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: theme.fontWeights.bold }}>{format(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: theme.fontWeights.bold }}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: theme.fontWeights.bold }}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      <Pressable onPress={openURL} style={styles.submitButton}>
        <Text style={styles.submitText}>Open in GitHub</Text>
    </Pressable>
 </View>
  )
}

export default RepositoryInfo;