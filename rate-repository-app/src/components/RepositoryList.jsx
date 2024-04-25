import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
// import useRepositories from '../hooks/useRepositories';
import useRepositoriesGraphQL from '../hooks/useRepositoriesGraphQL';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // fetch repositories
  // const { repositories } = useRepositories();

  // get repositories using GraphQl
  const { repositories } = useRepositoriesGraphQL();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;