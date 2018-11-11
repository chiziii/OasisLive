import React, { Component } from 'react';
import {Alert, View,StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Card, CardItem, Body, Left, Right, Icon } from 'native-base';
import SInfo from 'react-native-sensitive-info';
import AuthController from 'app/Services/Http/Controllers/Auth/AuthController';
import Config from 'LearnBaseApp/Config';
import LBAlert from 'app/Components/Alert';
import {Loader} from 'app/Components/Loader';

const authController = new AuthController();
export default class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
      this.LBAlert = new LBAlert();
  }

   _signOut = () => {
     authController.logout((success) => {
       if (success) {
         this.props.navigation.navigate("Auth")
       }
     })
  }

  render() {
    return (
      <Container style={styles.MainContainer}>
        <Content padder>
          <Card>
            <CardItem header>
              <Left>
                  <Body>
                    <Text style = {styles.logoText}>{Config.app_name}</Text>
                  </Body>
              </Left>
            </CardItem>
         </Card>

          <Card>
            <CardItem header>
              <Left>
                  <Body>
                    <Text style={{fontFamily: "Cochin", fontSize: 20, fontWeight: "bold", color:"#333"}}>
                      Are you sure you want to Log out?
                    </Text>
                  </Body>
              </Left>
            </CardItem>
            <CardItem footer>
              <Left>
                  <Body>
                    <Button iconLeft success
                      onPress={this._signOut}>
                      <Icon name='log-in' />
                      <Text>Logout</Text>
                    </Button>
                  </Body>
              </Left>
              <Right>
                  <Body>
                    <Loader animating={ this.state.loading } size="large" hidesWhenStopped={true}/>
                  </Body>
              </Right>

            </CardItem>
           </Card>
        </Content>
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
  MainContainer: {
    flex: 1,
    flexDirection: 'column'
  },
	logoText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		marginTop: 5,
	},
});
