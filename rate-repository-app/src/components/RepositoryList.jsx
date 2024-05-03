import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
// import useRepositoriesGraphQL from '../hooks/useRepositoriesGraphQL';
// import useRepositoriesSorting from '../hooks/useRepositoriesSorting';
import useRepositoriesSortAndFilter from '../hooks/useRepositoriesSF';
import { useNavigate } from "react-router-dom";
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryList = () => {  
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositoriesSortAndFilter({orderDirection, orderBy, searchKeyword});

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  }

  const handleChangeInSorting = (value) => {
    if (value === "LatestRepositories") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
    } else if (value === "HighestRatedRepositories") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("DESC");
    } else {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection("ASC");
    }
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearchChange}
            value={searchQuery}
            style={{marginTop: 5}}
          />
          <Picker
            selectedValue={
              orderBy === 'CREATED_AT' ? "LatestRepositories" : orderDirection === "DESC" ? 
              "HighestRatedRepositories" : "LowestRatedRepositories"
            }
            onValueChange={(itemValue) =>
              handleChangeInSorting(itemValue)
            }
            style={{margin: -25}}
            >
              <Picker.Item label="Latest Repositories" value="LatestRepositories" />
              <Picker.Item label="Highest Rated Repositories" value="HighestRatedRepositories" />
              <Picker.Item label="Lowest Rated Repositories" value="LowestRatedRepositories" />
            </Picker>
          </View>
        }
      />
    );
};

export default RepositoryList;