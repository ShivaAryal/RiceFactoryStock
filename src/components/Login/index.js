import React, { Component } from 'react';
import { View, ScrollView, ImageBackground,ActivityIndicator, KeyboardAvoidingView,TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { styles } from './login.css';
import LoginService from './login.services';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            password:'',
            signOut:false
         };
    }

    isValidEmail(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase()) && this.state.email.length>0;
    }

    onChangeEmail(email){
        email = email.replace(/\s/g, '')
        this.setState({email:email})
    }

    onChangePassword(password){
        password = password.replace(/\s/g, '')
        this.setState({password:password})
    }

    onLoginPress=()=>{
        this.setState({loading:true})
        LoginService.postLogin(this.state.email,this.state.password).then(res=>{
            AsyncStorage.setItem('USERDATA',JSON.stringify(res))
            this.setState({loading:false})
            this.props.navigation.navigate('Home')
        }).catch(err=>{
            this.setState({loading:false})
            alert("Unmatched email and password")}
        )
    }

    componentDidMount(){
        this.setState({loading:'true'})
        AsyncStorage.getItem('USERDATA').then(res=>{
            if(res){
                res= JSON.parse(res)
                if(res.token){
                    this.setState({loading:'false'})
                    this.props.navigation.navigate('Home')
                }else{
                    this.setState({loading:false})
                }
            }else{
                this.setState({loading:false})
            }
        }).catch(err=>{
            this.setState({loading:false})
            // alert("err")
        })
        this.setState({loading:false})
    }

    componentWillReceiveProps(){
        this.setState({signOut:true,loading:false})
    }

    render() {
        return (
        <ImageBackground style={{flex:1,resizeMode:'contain '}} source={require('./../../../assets/dhan.png')}>
                {this.state.loading && <View style={styles.loaderContainer}>
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                </View> ||
                <ScrollView contentContainerStyle={{flex:1,height:'100%',width:'100%',backgroundColor:'rgba(255,255,255,0.4)',padding:20,paddingTop:'40%'}}
                    keyboardShouldPersistTaps="handled"
                >
                <KeyboardAvoidingView>
                <TextInput 
                    style={{backgroundColor:'rgba(255,255,255,0)',width:'80%'}}
                    theme={{ colors: { primary: "#BF360C" }}}
                    value={this.state.email}
                    autoCapitalize="none"
                    label={<Text style={{color:'#BF360C'}}>Email</Text>}
                    underlineColor="#BF360C"
                    placeholder="Email id here"
                    onChangeText={(text)=>this.onChangeEmail(text)} 
                />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView>
                <TextInput 
                    style={{backgroundColor:'rgba(255,255,255,0)',width:'80%',marginTop:40}}
                    theme={{ colors: { primary: "#BF360C" }}}
                    value={this.state.password}
                    autoCapitalize="none"
                    label={<Text style={{color:'#BF360C'}}>Password</Text>}
                    underlineColor="#BF360C"
                    placeholder="Password here"
                    secureTextEntry={true}
                    onChangeText={(text)=>this.onChangePassword(text)} 
                />
                </KeyboardAvoidingView>
                <TouchableOpacity style={[styles.button,{backgroundColor:this.state.email.length>0 && this.state.password.length>0 && '#FF5722' || '#FF7043'}]}
                    activeOpacity={0.7}
                    disabled={!this.state.email.length>0 || !this.state.password.length>0}
                    onPress={()=>this.onLoginPress()}
                >
                    <Text style={styles.text} >Login</Text>
                </TouchableOpacity>
                </ScrollView>}
           </ImageBackground>
        );
    }
}

export default Login;
