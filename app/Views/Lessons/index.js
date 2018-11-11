import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, } from 'react-native';
import { Container,Card, CardItem, Icon, Left, Header, Body, Title, Right, Button, Thumbnail} from "native-base";
import { WebView } from 'react-native';
import {Loader} from "../../Components/Loader";

export default class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loading: true,
			menu_icon: 'ios-menu',
			default_title: "Lessons",
    }

  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Card>
          <CardItem style={{flex: 1, flexDirection: "column" }} >
                <WebView
        source={{uri: item.lesson_video_url}}
        style={{marginTop: 20,width: 300, height: 200}}
      />
            <View style={styles.textView}>
              <Text>
                {"Title: " + item.title}
              </Text>
              <Text>
                {"Course: " +  item.course}
              </Text>
              <Text >
                {"Lesson Type: " + item.lesson_type}
              </Text>
              <Text>
                {"Date: " + item.created_at}
              </Text>
            </View>
          </CardItem>
        </Card>
      </View>
    )
  }

  // itemSeparator = () => {
  //   return (
  //     <View
  //       style = {{ height: 1, width: 400, backgroundColor: '#333' }}>
  //     </View>
  //   )
  // }

  componentDidMount() {
    // return fetch('https://learnbase.com.ng/api/lessons?course_uuid=f2da82ca-8ea8-11e8-9913-0a831060a042')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson.data
    //     }, function () {
    //
    //     });
    //
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     this.setState({
    //       isLoading: false,
    //     }, function () {
    //
    //     });
    //   });
  }

  render() {
    const { navigation } = this.props;
    const openDrawer = navigation.openDrawer;
    return (
      <Container style={styles.MainContainer}>
        <Header style={{backgroundColor: '#2f396e'}}>
					<Left>
          <Button
            transparent
            onPress={() => {
                typeof openDrawer !== 'undefined'? navigation.toggleDrawer() : navigation.goBack()
              }
            }
          >
          <Icon name={typeof openDrawer !== 'undefined'? "menu" : "arrow-back"} style={{color:'white'}}/>
          </Button>
					</Left>
					<Body>
						<Title style={{color: 'white'}}>{this.props.navigation.getParam('title', this.state.default_title)}</Title>
					</Body>
        </Header>
        <Loader animating={this.state.isLoading} size="large" style={styles.loader} hidesWhenStopped={true} />
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
          // ItemSeparatorComponent={this.itemSeparator}
        />
      </Container>
    );
  }

}
const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    flexDirection: 'column'

  },

  imageView: {

    width: 300,
    height: 100,
    margin: 7,
    borderRadius: 7

  },

  textView: {

    padding: 4,
    color: '#000',
    textAlign: "left",
    marginLeft: 0

  }

});
