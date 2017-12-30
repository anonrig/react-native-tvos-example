/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';

console.disableYellowBox = true;

export default class App extends Component<{}> {
  state = {
    articles: null,
    article: null
  }

  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: dataSource,
      articles: dataSource.cloneWithRows([]),
      article: null
    };
  }

  componentWillMount() {
    fetch('https://newsapi.org/v2/everything?q=apple&from=2017-12-29&to=2017-12-29&sortBy=popularity&apiKey=27004e56816a4432b343d918dd33c53f')
      .then(res => res.json())
      .then((response) => {
        console.log('response', response.articles);
        this.setState({articles: this.state.ds.cloneWithRows(response.articles)});
      })
  }

  renderPosts(article) {
    return (
      <TouchableOpacity key={article.urlToImage} activeOpacity={1} style={{opacity: 0.5}} onPress={() => this.setState({article})}>
        <View style={styles.articleContainer}>
          <Image source={{uri: article.urlToImage}} style={styles.buttonContainer} />
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.description} numberOfLines={6}>{article.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSingleScreen() {
    const {article} = this.state;
    console.log('article', article);
    return (
      <View style={styles.singleScreenContainer}>
        <Image source={{uri: article.urlToImage}} style={styles.singleScreenImage}/>
        <View style={styles.singleScreenRight}>
          <Text style={styles.singleScreenSource}>Source: {article.source.name}</Text>
          <Text style={styles.singleScreenText}>{article.description}</Text>
          <TouchableOpacity onPress={() => this.setState({article: null})}>
            <View style={styles.backButtonContainer}>
              <Text style={styles.backButton}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {article, articles} = this.state;

    if (article) {
      return this.renderSingleScreen();
    }

    return (
      <ListView
        renderRow={(rowData) => this.renderPosts(rowData)}
        style={styles.container}
        dataSource={this.state.articles}
        horizontal={true}
        removeClippedSubviews={false}>
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  singleScreenContainer: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row'
  },
  singleScreenImage: {
    flex: 0.5,
  },
  singleScreenRight: {
    flex: 0.5
  },
  singleScreenSource: {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 50,
    paddingLeft: 50,
    paddingTop: 50,
    paddingLeft: 50,
    paddingBottom: 0
  },
  singleScreenText: {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 30,
    padding: 50
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  articleContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 4
  },
  description: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 40,
    fontSize: 30,
    fontFamily: 'Avenir Next'
  },
  source: {
    color: 'white',
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: 20,
    fontSize: 40,
    fontFamily: 'Avenir Next'
  },
  pressMe: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  backButtonContainer: {
    backgroundColor: 'gray',
    width: 400,
    alignSelf: 'center'
  },
  backButton: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    padding: 10
  }
});
