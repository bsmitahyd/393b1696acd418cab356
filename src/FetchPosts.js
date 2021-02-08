import React, {Component} from 'react';
import {} from 'native-base';
import {
  FlatList,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import DisplayData from './DisplayData';

export default class FetchPosts extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      responseList: [],
      searchData: [],
      search: '',
      fetchingStatus: false,
      setOnLoad: false,
    };
    this.page = -1;
  }

  componentDidMount() {
    this.apiCall();
    // this._interval=setInterval(()=>{
    // this.apiCall();
    // },10000)
  }

  apiCall = () => {
    var that = this;
    that.page = that.page + 1;

    that.setState({
      fetchingStatus: true,
    });
    console.log(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=` +
        that.page,
    );
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=` +
        that.page,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({
          responseList: [...this.state.responseList, ...responseJson.hits],
          searchData: [...this.state.searchData, ...responseJson.hits],
          isLoading: false,
          setOnLoad: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({setOnLoad: false, fetchingStatus: false});
      });
  };

  footer = () => {
    return (
      <View style={styles.bottomLoader}>
        {this.state.fetchingStatus ? (
          <ActivityIndicator size="large" color="#6CD0FA" />
        ) : null}
      </View>
    );
  };

  updateSearch = (value, type) => {
    this.setState({search: value});
    const data = this.state.responseList;
    var newData = [];
    let filteredAuthors = data.filter(function (item) {
      const itemData = item.author
        ? item.author.toUpperCase()
        : ''.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexof(textData) > -1;
    });
    let filteredTitle = data.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexof(textData) > -1;
    });
    let filteredUrl = data.filter(function (item) {
      const itemData = item.url ? item.url.toUpperCase() : ''.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexof(textData) > -1;
    });

    newData = [...filteredAuthor, ...filteredTitle, ...filteredUrl];
    this.setState({searchData, newData});
  };
  _renterItem = (item) => {
    return (
      <View style={{marginHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DisplayPost', {
              data: item,
            });
          }}>
          <View style={styles.viewStyle}>
            <DisplayData
              title={item.title}
              URL={item.url}
              created_at={item.created_at}
              author={item.author}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title / url / author"
            placeholderTextColor="gray"
            color="black"
            onChangeText={(search) => this.updateSearch(search)}
            value={this.state.search}></TextInput>
        </View>
        {this.state.isLoading ? (
          <View style={styles.bottomLoader}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.searchData}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => this._renterItem(item)}
            showsHorizontalScrollIndicator={true}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomLoader: {
    marginTop: '70%',
  },
  searchView: {
    marginVertical: 10,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '90%',
    height: 50,
    paddingLeft: '1%',
    fontSize: 17,
    justifyContent: 'center',
    borderWidth: 0.3,
    borderRadius: 10,
    color: 'white',
  },
});
