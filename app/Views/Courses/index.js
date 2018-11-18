import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, Dimensions, StatusBar, Platform } from 'react-native';
import { Container,Card, Content, CardItem, Icon, Left, Header, Body, Title, Right, Button, Thumbnail} from "native-base";
import {Loader} from "app/Components/Loader";
import api from 'app/Services/Http/Routes/api';
import Config from 'LearnBaseApp/Config';
import CoursesController from 'app/Services/Http/Controllers/CoursesController';
import ProfileController from 'app/Services/Http/Controllers/ProfileController';

const {height, width} = Dimensions.get('window');
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const _CoursesController = new CoursesController();
const _ProfileController = new ProfileController();

export default class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.programData = this.props.navigation.getParam("data");
    this.state = {
      isLoading: true,
      loading: true,
			menu_icon: "ios-menu",
			default_title: "Courses",
      program_data: this.programData,
      title: typeof this.programData !== 'undefined' ? this.programData.name : 'Courses',
      data: []
    }
  }

  _currentDateTime(){
    var objToday = new Date(),
  	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  	dayOfWeek = weekday[objToday.getDay()],
  	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  	curMonth = months[objToday.getMonth()],
  	curYear = objToday.getFullYear(),
  	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

    return today;
  }

  _greetings(){
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
    var greeting = 'Good ';
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      greeting += 'Morning'
    } else if (curHr < 18) {
      greeting += 'Afternoon'
    } else {
      greeting += 'Evening'
    }
    this.setState({
      greeting: greeting,
      datetime: this._currentDateTime()
    })
  }

  async _loadUser(){
    _ProfileController._getFromLocalStore()
  }


  _closeLoader = () => {
    this.setState({isLoading: false})
  }

  _loadFromAPI(){
    let program_id = typeof this.programData !== 'undefined' ? this.programData.uuid : 'none';
    _CoursesController._getFromAPI(program_id,
      (done)=>{
        this._closeLoader();
        this.setState({
          data: done
        });
      },
      (error)=>{
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

  _navigateOrPay(item){
    if (item.price.toLowerCase() === 'free') {
      this.props.navigation.navigate("Lessons", {data: item})
    }
  }

  componentDidMount() {
    this._greetings()
    this._loadFromAPI();
    // this._loadUser()
  }

  renderItem = ({ item }) => {
    return (
        <Card>
          <CardItem button onPress = {() => this._navigateOrPay(item)}
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
              onPress = {() => this._navigateOrPay(item)}>
              <Text style = {{color: 'white',}}>Enroll</Text>
            </Button>
          </CardItem>
        </Card>
    )
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if(Platform.OS == 'android'){
      StatusBar.setBackgroundColor('#2f396e')
    }
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
						<Title style={{color: 'white'}}>{this.state.title}</Title>
					</Body>
        </Header>
        <Content padder>
        <Card style={styles.mb}>
          <CardItem bordered>
            <Left>
              <Body>
              <Text style = {styles.dateText}>{this.state.datetime}</Text>
              <Text style = {styles.greetingsText}>Hi, {this.state.greeting}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Loader animating={this.state.isLoading} size="large" style={styles.loader} hidesWhenStopped={true} />
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
          // ItemSeparatorComponent={this.itemSeparator}
        />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    flexDirection: "column"
  },
	dateText: {
		fontSize: 15,
	},
	greetingsText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		marginTop: 5,
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
