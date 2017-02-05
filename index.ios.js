/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  ListView,
  Image,
  Dimensions,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window')

import recipes from './data'
import NavBar from './components/Navbar'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class rotten extends Component {
  constructor(){
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      like: false,
      loaded: false,
      anim: new Animated.Value(0),
      anim_rotateY: new Animated.Value(0),
      anim_translateX:new Animated.Value(width),
      isMenuOpen:false,
      menuAnimate: new Animated.Value(0),
      dataSource: ds.cloneWithRows(recipes)
    }
  }

  componentDidMount(){
      this.setState({
          loaded:true
      })
  }

  renderRow(rowData){
    const img = rowData.image;
    return (
      <TouchableHighlight style={[styles.containerRow]}>
        <View>
          <Image
            style={{
              width: width,
              height: 170
            }} 
            source={{uri : img }}
          />
          <View
            style={styles.imageFooter}
          >
            <View style={styles.imageFooterUser}>
              <Image  
                style={styles.imageAvatar}
                source={{uri: rowData.user}}
              />
            </View>
            <View style={styles.imageFooterText}>
              <Text style={[styles.textFooter, styles.textFooterBold]}>{rowData.food}</Text>
              <Text style={styles.textFooter}>{rowData.title}</Text>
              <Text style={[styles.textFooter, styles.textFooterLight, styles.textFooterLittle]}>By {rowData.by}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  showMenu(){
        if(this.state.isMenuOpen){
            this.setState({isMenuOpen:false});
            Animated.parallel([
                Animated.timing(
                    this.state.anim_translateX,{
                        toValue:width
                }),
                Animated.timing(
                    this.state.anim_rotateY,{
                        toValue:0
                }),
            ]).start();
        }
        else {
            this.setState({isMenuOpen:true});
            Animated.parallel([
                Animated.timing(
                    this.state.anim_translateX,{
                        toValue:width*.60
                }),
                Animated.timing(
                    this.state.anim_rotateY,{
                        toValue:1
                }),
                Animated.timing(
                this.state.menuAnimate, {
                    toValue: 1,
                    duration: 800   
                })
            ]).start();
        }
    }
    closeMenu(){
        this.setState({isMenuOpen:false});
        Animated.parallel([
            Animated.timing(
                this.state.anim_translateX,{
                    toValue:width
            }),
            Animated.timing(
                this.state.anim_rotateY,{
                    toValue:0
            }),
            Animated.timing(
              this.state.menuAnimate, {
                  toValue: 0,
                  duration: 300   
              })
        ]).start();
    }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content,{width:width,backgroundColor:'gray',flex:1,
          transform:[{ perspective: 450},
                      { translateX: this.state.anim_translateX.interpolate({
                                        inputRange: [0, width],
                                        outputRange: [width, 0],
                      })},
                      { rotateY: this.state.anim_rotateY.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '-10deg'],
                      })},
                    ]
          }]}>
          {this.state.isMenuOpen ? <NavBar icon="times" pressMenu={this.closeMenu.bind(this)} /> 
            : <NavBar icon="bars" pressMenu={this.showMenu.bind(this)} />
          }
          
         {this.state.isMenuOpen ?  <ListView 
            showsHorizontalScrollIndicator={false}
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          /> : <TouchableWithoutFeedback>
            <ListView 
              showsHorizontalScrollIndicator={false}
              style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
            </TouchableWithoutFeedback>}
        </Animated.View>
        <Animated.View style={{opacity: this.state.menuAnimate, position:'absolute',width:140,left:0,top:120,backgroundColor:'transparent'}}>
            <Text style={[styles.textFooter,styles.menutext]}>Home</Text>
            <Text style={[styles.textFooter,styles.menutext]}>New Recipe</Text>
            <Text style={[styles.textFooter,styles.menutext]}>Recipes</Text>
            <Text style={[styles.textFooter,styles.menutext]}>Profile</Text>
            <Text style={[styles.textFooter,styles.menutext]}>Settings</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555566',
    paddingTop: 20
  },
  content: {
    zIndex: 3
  },
  containerRow: {
    marginBottom: 10
  },
  listView: {
    marginHorizontal: 10
  },
  imageFooter: {
    backgroundColor: '#555566',
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 7
  },
  textFooter: {
    color: '#fff'
  },
  textFooterBold: {
    fontWeight: 'bold'
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 7
  },
  textFooterLight: {
    fontWeight: '100'
  },
  textFooterLittle: {
    fontSize: 11
  },
  menutext: {
    fontSize: 20,
    padding: 10
  },
  menu: {
    width: width,
    height: height,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#ff00ff'
  },
  menulist: {
    width: 200,
    position: 'absolute',
    right: 0,
    top:100
  },
});

AppRegistry.registerComponent('rotten', () => rotten);
