import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Navbar extends Component {
    render(){
        return (
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={this.props.pressMenu}>
                    <Icon name={this.props.icon} size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titleNavbar}>New Recipes</Text>
                <Icon name="search" size={25} color="#fff" />
                <Icon name="heart" size={25} color="#fff" />
                <Icon name="ellipsis-v" size={25} color="#fff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#555566',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleNavbar: {
        fontSize: 20,
        color: '#fff'
    }
})