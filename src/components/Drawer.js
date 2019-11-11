import React, { Component } from 'react';
import { View,ScrollView,StyleSheet,Image,Text, Modal, AsyncStorage } from 'react-native';
import {List,Divider,Button} from 'react-native-paper';
class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            logOutVisible:false
         };
    }

    onLogOutPress=()=>{
        this.props.navigation.closeDrawer()
        this.setState({logOutVisible:true})
    }

    onSignOut=()=>{
        this.setState({logOutVisible:false})
        AsyncStorage.removeItem('USERDATA')
        this.props.navigation.navigate('Login',{signOut:true})
    }

    render() {
        const navigate = this.props.navigation.navigate; 
        return (
            <ScrollView style={styles.drawer}>
                <View style={styles.headerView}>
                    <Image source={require('./../../assets/myimage.jpg')}
                        style={styles.image} />
                </View>
                <List.Item
                    style={styles.item}
                    title={<Text>Home</Text>}
                    left={() => <List.Icon icon="home" color="#3E2723" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Home',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Sales</Text>}
                    left={() => <List.Icon icon="attach-money" color="#4CAF50" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Sales',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Purchases</Text>}
                    left={() => <List.Icon icon="money-off" color="#d50000" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Purchases',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Monthly Sales</Text>}
                    left={() => <List.Icon icon="wrap-text" color="#FF6F00" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('MonthlySales',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Monthly Purchase</Text>}
                    left={() => <List.Icon icon="money-off" color="#76FF03" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('MonthlyPurchases',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Transactioner</Text>}
                    left={() => <List.Icon icon="people" color="#000000" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Transactioner',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Stock</Text>}
                    left={() => <List.Icon icon="local-grocery-store" color="#303F9F" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Stock',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Expense</Text>}
                    left={() => <List.Icon icon="mood-bad" color="#004D40" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Expense',{props:'props'})}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Settings</Text>}
                    left={() => <List.Icon icon="settings" color="#1B5E20" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>navigate('Settings')}
                />
                <Divider style={{marginHorizontal:10}}/>
                <List.Item
                    style={styles.item}
                    title={<Text>Log out</Text>}
                    left={() => <List.Icon icon="exit-to-app" color="#d50000" style={{marginLeft:0,marginRight:0}}/>}
                    onPress={()=>this.onLogOutPress()}
                />
                <Divider style={{marginHorizontal:10}}/>
                <Modal
                    style={{}}
                    onRequestClose={()=>this.setState({logOutVisible:false})}
                    transparent={true}
                    visible={this.state.logOutVisible}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex:1,justifyContent:'center'}}>
                        <View style={styles.modalView}>
                            <Text style={{fontSize:18,color:'#000',marginLeft:20}}>Are you sure you want to log out?</Text>
                            <View style={{flexDirection:'row',marginTop:20,justifyContent:'flex-end'}}>
                                <Button color="#000" style={{backgroundColor:'#fff'}} onPress={()=>this.setState({logOutVisible:false})}>
                                    <Text style={{color:'#2196F3'}} >CANCEL</Text>
                                </Button>
                                <Button color="#000" style={{marginRight:0,backgroundColor:'#d32f2f'}} onPress={()=>this.onSignOut()}>
                                    <Text style={{color:'#fff'}} >LOG OUT</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    drawer:{
        flex:1,
        backgroundColor:'#fff'
    },
    headerView:{
        height:125,
        backgroundColor:'#FF5722',
        justifyContent:'center'
    },
    image:{
        marginLeft:20,
        height:90,
        width:90,
        borderRadius:50
    },
    item:{
        paddingTop: 0,
        paddingBottom: 0,
        height:50,
        justifyContent:'center'
    },
    modalView:{
        // marginTop: 22,
        backgroundColor:'#fff',
        // height:120,
        width:'80%',
        paddingTop:20,
        alignSelf:'center',
        // alignItems:'center',
        paddingBottom:20,
        borderRadius:5,
        // justifyContent:'center'
        paddingRight:10
    }

})

export default Drawer;