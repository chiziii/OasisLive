import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Dimensions
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
	Body,
	Card,
	CardItem,
	Thumbnail,
} from "native-base";

const deviceWidth = Dimensions.get("window").width;

const ProgramsList = props => {
    const {
      item,
      ...attributes
    } = props;
    return (
        <Card style={styles.mb}>
            <CardItem bordered>
                <Left>
                    <Thumbnail source={item.logo} />
                    <Body>
                        <Text>{item.program_name}</Text>
                        <Text note>{item.company_name}</Text>
                    </Body>
                </Left>
            </CardItem>

            <CardItem>
                <Body>
                    <Image
                        style={{
                            alignSelf: "center",
                            height: 150,
                            resizeMode: "cover",
                            width: deviceWidth / 1.18,
                            marginVertical: 5
                        }}
                        source={item.program_image}
                    />
                    <Text>
                        {item.program_desc}
                    </Text>
                </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
                <Left>
                    <Button transparent>
                        <Icon name="ios-open" />
                        <Text>View Programme</Text>
                    </Button>
                </Left>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff"
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
		}
  });

  export default ProgramsList;
