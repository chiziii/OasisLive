import React, { Component } from "react";
import { Image } from "react-native";
import { Platform, Dimensions, StyleSheet } from "react-native";

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import Config from 'LearnBaseApp/Config';
// import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const drawerCover = require("LearnBaseApp/assets/images/drawer-cover.png");
const drawerImage = require("LearnBaseApp/assets/images/dorcas-logo.png");

const datas = [
  {
    name: "Programs",
    route: "Programs",
    icon: "albums"
  },
  {
    name: "Courses",
    route: "Courses",
    icon: "book"
  },
  {
    name: "Settings",
    route: "Settings",
    icon: "cog"
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }
  truncateCharacter(text: String){
    if(text.length > 20) {
      //do something...
    }
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image style={styles.drawerCover} source={drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />
          <Text style={styles.drawerUserName}>{Config.app_name}</Text>
          <Text style={styles.drawerUserEmail}></Text>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.push(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;



const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 23 : deviceWidth / 22,
    top: Platform.OS === "android" ? deviceHeight / 19 : deviceHeight / 18,
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  drawerUserName: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 23 : deviceWidth / 22,
    top: Platform.OS === "android" ? deviceHeight / 6 : deviceHeight / 5,
    resizeMode: "cover",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: null,
    height: 75,
  },
  drawerUserEmail: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 23 : deviceWidth / 22,
    top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 4,
    resizeMode: "cover",
    color: 'white',
    fontWeight: 'bold',
    width: 270,
    height: 75,
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
});
