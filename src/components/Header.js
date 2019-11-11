import React, { Component } from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    // componentDidMount(){
    //     console.log(this.props)
    // }
    render() {
        return (
            <View style={styles.header}>
                <MaterialIcons name="menu" size={25} color="#fff" style={{alignSelf:'center'}}
                    onPress={()=>this.props.navigation.openDrawer()}
                />
                <Text style={styles.title}>{this.props.title}</Text>
                <View></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#FF5722',
        height:50,
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    title:{
        color:'#fff',
        fontSize:22,
        marginRight:30
    }
})

export default Header;