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

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.programData = this.props.navigation.getParam("data");
    this.state = {
      isLoading: true,
      loading: true,
      title: 'Settings',
    }
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
						<Title style={{color: 'white'}}>{this.state.title}</Title>
					</Body>
        </Header>
        <Content padder>
        <Card style={styles.mb}>
          <CardItem button onPress = {() => this.props.navigation.navigate("Logout")}>
            <Left>
              <Body>
              <Text style = {styles.dateText}>Logout</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
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
