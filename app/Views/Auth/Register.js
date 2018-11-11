import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Card, CardItem, Body, Left, Right, Icon } from 'native-base';
import SInfo from 'react-native-sensitive-info';
import RegisterController from 'app/Services/Http/Controllers/Auth/RegisterController';
import Config from 'LearnBaseApp/Config';
import LBAlert from 'app/Components/Alert';
import {Loader} from 'app/Components/Loader';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        password_confirmation: '',
        loading: false,
      };
      this.regController = new RegisterController();
      this.LBAlert = new LBAlert();
  }

  _closeLoader = () => {
    this.setState({loading: false})
  }

  _signUp = () => {
    this.setState({loading: true})

    payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    this.regController._signUp(
      payload,
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
        // console.log(error.response.data);
        errors = error.response.data.errors;
        errMsg = '';
        for (key in errors) {
          if (errors.hasOwnProperty(key)) {
              errArr = errors[key];
              errArr.map((item) => {
                return errMsg = errMsg + '\n' + item;
              })
          }
        }
        return this.LBAlert.dismiss(error.response.data.message, errMsg);
      }
    )
  }

  _gotoSignIn = () => {
    this.props.navigation.navigate("Login");
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
                    <Text>Sign Up</Text>
                  </Body>
              </Left>
            </CardItem>
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  keyboardType = "default"
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onChangeText={(text) => this.setState({first_name: text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  keyboardType = "default"
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onChangeText={(text) => this.setState({last_name: text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Email Address</Label>
                <Input
                  keyboardType = "email-address"
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input
                  keyboardType = "phone-pad"
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onChangeText={(text) => this.setState({phone: text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  keyboardType = 'default'
                  autoCorrect = {false}
                  onChangeText={(text) => this.setState({password: text})}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Confirm Password</Label>
                <Input
                  secureTextEntry={true}
                  keyboardType = 'default'
                  autoCorrect = {false}
                  returnKeyType = 'go'
                  onSubmitEditing ={() => this._signUp()}
                  onChangeText={(text) => this.setState({password_confirmation: text})}
                />
              </Item>
            </Form>

            <CardItem style={{flex: 1, flexDirection: "column" }}>

            </CardItem>
            <CardItem footer>
              <Left>
                  <Body>
                    <Button iconLeft success onPress={this._signUp}>
                      <Icon name='log-in' />
                      <Text>Register</Text>
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
                   <Text>Already have an account? </Text>
                 </Body>
             </Left>
             <Right>
                 <Body>
                   <Button iconLeft danger onPress={this._gotoSignIn}>
                      <Icon name='arrow-forward' />
                      <Text>Sign In</Text>
                    </Button>
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
