import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Container,Card, CardItem, Icon, Left, Header, Body, Title, Right, Button, Thumbnail} from "native-base";
import {Loader} from "app/Components/Loader";
import api from 'app/Services/Http/Routes/api';
import Config from 'LearnBaseApp/Config';
import CoursesController from 'app/Services/Http/Controllers/CoursesController';

const {height, width} = Dimensions.get('window');
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const _CoursesController = new CoursesController();

export default class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loading: true,
			menu_icon: "ios-menu",
			default_title: "Courses",
      program_data: this.props.navigation.getParam("data"),
      data: []
    }
  }

  _closeLoader = () => {
    this.setState({isLoading: false})
  }

  _loadFromAPI(){
    let program_id = this.state.program_data.uuid;
    _CoursesController._getFromAPI(program_id,
      (done)=>{
        this._closeLoader();
        this.setState({
          data: done
        });
      },
      (error)=>{
        // alert(error);
        this._closeLoader();
      }
    );
  }

  _isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  componentDidMount() {
    this._loadFromAPI();
  }

  renderItem = ({ item }) => {
    return (
        <Card>
          <CardItem button onPress = {() => this.props.navigation.navigate("lessons")}
          style={{ flex: 1, flexDirection: "column" }}>
            <Image source={{ uri: item.Featured_Image }}
              style={styles.courseImage}
            />
          </CardItem>
          <CardItem bordered>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>
              {item.title}
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{fontSize: 15}}>
              {item.Description}
            </Text>
          </CardItem>
          <CardItem>
            <View style={styles.textView}>
              <Text style={{fontSize: 15, fontWeight: "bold"}}>
                {item.program}
              </Text>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>
                {item.price}
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <Button
              title="View Program"
              style = {{padding: 10}}
              onPress = {() =>this.props.navigation.navigate("Lessons")}>
              <Text style = {{color: 'white',}}>Enroll</Text>
            </Button>
          </CardItem>
        </Card>
    )
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
						<Title style={{color: 'white'}}>{this.state.program_data.name}</Title>
					</Body>
        </Header>
        <Loader animating={this.state.isLoading} size="large" style={styles.loader} hidesWhenStopped={true} />
        <FlatList
          data={this.state.data}
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
    flexDirection: "column"
  },

  imageView: {
    width: null,
    height: null,
    margin: 7,
    borderRadius: 7
  },

  textView: {
    color: '#000',
    textAlign: 'left',
    fontWeight: "bold",
  },
  courseImage: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
    // resizeMode: "cover",
  },

});
