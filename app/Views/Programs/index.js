import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Image, WebView, StatusBar, Platform, Dimensions, Modal, BackHandler, NetInfo } from 'react-native';
import {Container,Card, CardItem, Icon, Content, Left, Header, Body, Title, Right, Button, Thumbnail} from "native-base";
import Toast, {DURATION} from 'react-native-easy-toast'
import {Loader} from "app/Components/Loader";
import ProgramsController from 'app/Services/Http/Controllers/ProgramsController';
import axios from 'axios';
import ErrorHandler from 'app/Utils/ErrorHandler'
import Config from 'LearnBaseApp/Config';

const {height, width} = Dimensions.get('window');
const _ProgramsController = new ProgramsController();
const programs_url = `${Config.api_base_url}${api.PROGRAMS}?company_uuid=${Config.company_id}`;
export default class Programs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loading: true,
			menu_icon: 'ios-menu',
      default_title: "Programs",
      loggedIn: false,
      modalVisible: !this.loggedIn,
      data: [],
    }
    // this._loadFromLocalDataStore()
  }

  _closeLoader = () => {
    this.setState({isLoading: false})
  }

  _loadFromLocalDataStore(){
    _ProgramsController._getFromStore(
      (data) => {
      this.setState(
        {data: data}
      )},
      (error) => {
        alert('error response ===> ' + JSON.stringify(error));
      }
    );
  }

  _loadFromAPI(){
    _ProgramsController._getFromAPI(
      (response) => {
        this._closeLoader();
        // alert('success response', JSON.stringify(response.data));
        this.setState({data: response})
      },
      (error) => {
        this._closeLoader();
        console.log('error response ===> ', JSON.stringify(error));
        // alert('error response ===> ' + error.request._response);
      }
    )
  }

  componentWillMount(){
    this._loadFromAPI()
  }

  renderItem = ({ item, index }) => {
    return (
      <Card key={index}>
        <CardItem bordered style={{flex: 1, flexDirection: "column" }}>
          <Left>
              <Body>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                  {item.name}
              </Text>
              </Body>
          </Left>
        </CardItem>
        <CardItem>
          <View style={styles.textView}>
            <Text>{item.Description}</Text>
            <Text style={{fontWeight: "bold"}}>
                {item.created_at}
            </Text>
          </View>
        </CardItem>
        <CardItem  key={index}>
            <View style={{alignItems: 'center'}}>
              <Button
                title="View Program"
                style = {{padding: 10}}
                onPress = {() =>this.props.navigation.navigate("Courses", {data: item})}>
                <Text style = {{color: 'white',}}>View Program</Text>
              </Button>
          </View>
        </CardItem>
      </Card>
    );
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
		if(Platform.OS == 'android'){
      StatusBar.setBackgroundColor('#2f396e')
    }
    return (
      <Container style={styles.MainContainer}>

        <Header style={{backgroundColor: '#2f396e'}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                  if(typeof this.props.navigation.openDrawer !== 'undefined'){
                    this.props.navigation.toggleDrawer()
                  } else {
                    this.props.navigation.goBack()
                  }
                }
              }
            >
            <Icon name={this.state.menu_icon} style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>{this.props.navigation.getParam('title', this.state.default_title)}</Title>
          </Body>
        </Header>
        <Content padder>
					<Card style={styles.mb}>
						<CardItem bordered>
							<Left>
								<Body>
								<Text style = {styles.dateText}>Monday 06, August 2018</Text>
								<Text style = {styles.greetingsText}>Good Evening, Olaoluwani</Text>
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
        <Toast ref="toast"/>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignContent: 'center',
		position: "absolute",
	},
  welcomeContainer: {
  	flex: 1,
  	backgroundColor: '#f1f1f1',
  	display: 'flex',
  	textAlign: 'left',
  	borderRadius: 4,
  	alignSelf: 'flex-start',
  	paddingTop: 30,
  	paddingLeft: 10,
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
	text: {
		alignSelf: "center",
		marginBottom: 7
	},
	mb: {
		marginBottom: 15
	},
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
    color: '#fff',
    textAlign: 'left',

  },
  icon: {
    width: 24,
    height: 24,
  },
});
