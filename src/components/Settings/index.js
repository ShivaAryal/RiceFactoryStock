import React, { Component } from 'react';
import { View,ScrollView,TouchableOpacity,Text,Modal,KeyboardAvoidingView,StyleSheet } from 'react-native';
import { IconButton,TextInput,FAB,Divider} from 'react-native-paper';
import Header from './../Header';
import SettingService from './settings.services'
import {getToken} from './../../utils';

class Settings extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }
    
    constructor(props) {
        super(props);
        this.state = {
            passwordVisible: false,
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
        };
    }

    isValid=()=>{
        const state = this.state;
        if(state.oldPassword && state.newPassword && state.confirmPassword){
            return true;
        }else{
            return false;
        }
    }

    onSubmit=()=>{
        const {oldPassword,newPassword,confirmPassword,token} = this.state;
        if(newPassword==confirmPassword){
            SettingService.changePassword(oldPassword,newPassword,token).then(res=>{
                alert('Successfully changed')
                this.setState({passwordVisible:false,oldPassword:'',newPassword:'',confirmPassword:''})
            }).catch(err=>{
                this.setState({passwordVisible:false,oldPassword:'',newPassword:'',confirmPassword:''})
                alert("Password change can't be completed")
            })
        }else{
            this.setState({passwordVisible:false,oldPassword:'',newPassword:'',confirmPassword:''})
            alert('New Password Unmatched')
        }
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token})
        })
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Header title="Settings" navigation={this.props.navigation}/>
                <TouchableOpacity
                    onPress={()=>this.setState({passwordVisible:true})}
                    activeOpacity={0.8} 
                    style={{flexDirection:'row',backgroundColor:'#E3F2FD',padding:5,alignItems:'center',margin:5}}>
                    <IconButton icon="vpn-key" color="#FF5722" size={25}
                        onPress={()=>this.setState({visible:true})}
                    />
                    <Text style={{fontSize:18,color:'#FF5722'}}>
                        Change Password
                    </Text>
                </TouchableOpacity>
                    <Modal
                    transparent={true}
                    onRequestClose={()=>this.setState({passwordVisible:false})}
                    visible={this.state.passwordVisible}>
                    <ScrollView contentContainerStyle={styles.modalBackground}
                        keyboardShouldPersistTaps="handled">
                        <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                                <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Edit Password</Text>
                                <FAB
                                    icon="close"
                                    color="#fff"
                                    style={{width:35,height:35,backgroundColor:'#c6291c',alignItems:'center',justifyContent:'center'}}
                                    onPress={()=>this.setState({passwordVisible:false})}
                                />
                            </View>
                            <Divider style={{marginVertical:10,height:2}}/>
                            <KeyboardAvoidingView style={{marginBottom:10}}>
                                <TextInput style={styles.textInput}
                                    theme={{ colors: { primary: "#FF5722" }}}
                                    value={this.state.oldPassword}
                                    label="Old Password"
                                    autoCapitalize="none"
                                    underlineColor='#FF5722'
                                    onChangeText={(text)=>this.setState({oldPassword:text})} 
                                    />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView style={{marginBottom:10}}>
                                <TextInput style={styles.textInput}
                                    theme={{ colors: { primary: "#FF5722" }}}
                                    secureTextEntry={true}
                                    value={this.state.newPassword}
                                    label="New Password"
                                    autoCapitalize="none"
                                    underlineColor='#FF5722'
                                    onChangeText={(text)=>this.setState({newPassword:text})} 
                                    />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView style={{marginBottom:10}}>
                                <TextInput style={styles.textInput}
                                    theme={{ colors: { primary: "#FF5722" }}}
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    value={this.state.confirmPassword}
                                    label="Confirm New Password"
                                    underlineColor='#FF5722'
                                    onChangeText={(text)=>this.setState({confirmPassword:text})} 
                                    />
                            </KeyboardAvoidingView>
                            <TouchableOpacity style={[styles.submitButton,{backgroundColor:this.isValid() && '#FF5722' || '#FF8A65'}]}
                            activeOpacity={0.7}
                            onPress={()=>this.onSubmit()}
                            disabled={!this.isValid()}
                        >
                            <Text style={{fontSize:20,color:'#fff'}}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}

export default Settings;

const styles = StyleSheet.create({
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.8)',
        flex:1,
        paddingHorizontal:'7%',
        paddingVertical:20,
        justifyContent:'center'
    },
    textInput:{
        backgroundColor:'#fff',
        fontSize:24,
        marginVertical:0,
        paddingVertical:0
    },
    submitButton:{
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'#FF5722',
        marginTop:10,
        height:40,
        width:100,
        justifyContent:'center',
        borderRadius:20
    },
})