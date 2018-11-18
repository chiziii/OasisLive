import React, { Component } from 'react';
import  { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Card, CardItem, Body, Left, Right, Icon } from 'native-base';
import SInfo from 'react-native-sensitive-info';
import LoginController from 'app/Services/Http/Controllers/Auth/LoginController';
import Config from 'LearnBaseApp/Config';
import LBAlert from 'app/Components/Alert';
import {Loader} from 'app/Components/Loader';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        loading: false,
      };
      this.loginController = new LoginController();
      this.LBAlert = new LBAlert();
  }

  _closeLoader = () => {
    this.setState({loading: false})
  }

  _signIn = () => {
    this.setState({loading: true})
    this.loginController._signIn(
      email = this.state.email,
      password = this.state.password,
      (success) => {
        this._closeLoader()
        if(success){
            this.props.navigation.navigate("Root");
        }
      },
      (error) => {
        this._closeLoader()
        if(error.status === 'error') {
          return this.LBAlert.dismiss(error.status, JSON.stringify(error.message))
        }

        if (typeof error.validation_error !== 'undefined') {
          errMsg = '';
          msg = error.message.map((item)=> {
            return errMsg = errMsg + '\n' + item;
          })
          return this.LBAlert.dismiss(error.validation_error, errMsg)
        }
        return this.LBAlert.dismiss('Error', "An unexpected error occured!");
      }
    )
  }

  _gotoSignUp = () => {
    this.props.navigation.navigate("Register");
  }

  render() {
    return (
      <Container style={styles.MainContainer}>
        <Content padder>
          <Card>
            <CardItem header>
              <Left>
                  <Body>
                    <Text style = {styles.greetingsText}>{Config.app_name}</Text>
                  </Body>
              </Left>
            </CardItem>
         </Card>

          <Card>
            <CardItem header>
              <Left>
                  <Body>
                    <Text>Sign In</Text>
                  </Body>
              </Left>
            </CardItem>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  keyboardType = "email-address"
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  keyboardType = 'default'
                  autoCorrect = {false}
                  returnKeyType = 'go'
                  ref = {'txtPassword'}
                  onSubmitEditing ={() => this._signIn()}
                  onChangeText={(text) => this.setState({password: text})}
                 />
              </Item>
            </Form>
            <CardItem footer>
              <Left>
                  <Body>
                    <Button iconLeft success
                      onPress={this._signIn}>
                      <Icon name='log-in' />
                      <Text>Sign In</Text>
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

           <Card>
             <CardItem footer>
               <Left>
                   <Body>
                     <Text>Dont have an account? </Text>
                   </Body>
               </Left>
               <Right>
                   <Body>
                     <Button iconLeft danger onPress={this._gotoSignUp}>
                        <Icon name='arrow-forward' />
                        <Text>Register</Text>
                      </Button>
                   </Body>
               </Right>
             </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

  componentDidMount(){

  }
};


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
	greetingsText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		marginTop: 5,
	},
});
