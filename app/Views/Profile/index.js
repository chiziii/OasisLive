import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, } from 'react-native';
import { Container,Card, CardItem, Icon, Left, Header, Body, Title, Right, Button, Thumbnail} from "native-base";
import { WebView } from 'react-native';
import {Loader} from "app/Components/Loader";
import LessonsController from "app/Services/Http/Controllers/LessonsController";

const _LessonsController = new LessonsController();

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.courseData = this.props.navigation.getParam("data");
    this.state = {
      isLoading: true,
      loading: true,
			menu_icon: 'ios-menu',
			default_title: "Lessons",
      course_data: this.courseData,
      title: typeof this.courseData !== 'undefined' ? this.courseData.title : 'Lessons',
    }

  }

  _closeLoader = () => {
    this.setState({isLoading: false})
  }

  _loadFromAPI(){
    let courseId = typeof this.courseData !== 'undefined' ? this.courseData.uuid : 'none';
    _LessonsController._getFromAPI(courseId,
      (done)=>{
        alert(JSON.stringify(done));
        this._closeLoader();
        this.setState({
          data: done
        });
      },
      (error)=>{
        alert(error);
        this._closeLoader();
      }
    );
  }

  componentDidMount() {
    this._loadFromAPI()
  }

  renderItem = ({ item }) => {
    return typeof item.lesson_video_url !== "undefined" && (
      <View>
        <Card>
          <CardItem style={{flex: 1, flexDirection: "column" }} >
            <WebView
              source={{uri: item.lesson_video_url}}
              style={{marginTop: 20,width: 300, height: 200}}
            />
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <View style={styles.textView}>
              <Text style={{fontSize: 30, fontWeight: "bold"}}>
                {item.title}
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.textView}>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>
                {item.course}
              </Text>
            </View>
          </CardItem>
          <CardItem>
          <View style={styles.textView}>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
              {item.lesson_type}
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
              {item.created_at}
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
    flexDirection: 'column'
  },
  imageView: {
    width: 300,
    height: 100,
    margin: 7,
    borderRadius: 7
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
  textView: {
    color: '#000',
    textAlign: 'left',
    fontWeight: "bold",
  },
});
