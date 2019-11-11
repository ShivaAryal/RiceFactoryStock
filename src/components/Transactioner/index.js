import React, { Component } from 'react';
import { View, StyleSheet,Keyboard,ScrollView, Modal, Text, TouchableOpacity, KeyboardAvoidingView,ActivityIndicator,Alert } from 'react-native';
import {Searchbar,IconButton, Divider,TextInput,FAB} from 'react-native-paper';
import Header from '../Header';
import { Table, Row, Rows } from 'react-native-table-component';
import OwnerService from './owner.services';
import {getToken} from './../../utils';
class Transactioner extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['S.N.', 'Owner', 'Address', 'Contact No.'],
            tableData: [],
            visible:false,
            filterMode:'Customer',
            searchText:'',
            searchMode:1,
            loading:false,
            editVisible:false
          }
    }

    refreshPage=()=>{
        this.setState({loading:true})
        OwnerService.getOwners(this.state.token).then(res=>{
            let tableData=[]
            res.reverse().map((owner,i)=>{
                tableData.push([i+1,owner.name,owner.address,owner.contactNumber,owner._id])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
        })
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token})
            this.setState({loading:true})
            OwnerService.getOwners(token).then(res=>{
                let tableData=[]
                res.reverse().map((owner,i)=>{
                    tableData.push([i+1,owner.name,owner.address,owner.contactNumber,owner._id])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert(err)
            })
        })
    }

    isValid(){
        const state = this.state;
        if(state.name && state.address && state.contactNumber) return true;
        else return false
    }

    onEditPress=(id,name,address,contactNumber)=>{
        this.setState({editVisible:true,editId:id,editName:name,editAddress:address,editNumber:contactNumber})
    }

    onSubmit(){
        Keyboard.dismiss()
        const {name,address,contactNumber} = this.state;
        this.setState({loading:true,visible:false})
        OwnerService.postOwner(this.state.token,name,address,contactNumber).then(res=>{
            alert("Successfully added")
            OwnerService.getOwners(this.state.token).then(res=>{
                let tableData = []
                res.map((owner,i)=>{
                    tableData.push([i+1,owner.name,owner.address,owner.contactNumber,owner._id])
                })
                this.setState({tableData:tableData,loading:false})
            })
            this.setState({
                name:'',
                address:'',
                contactNumber:'',
                loading:false
            })
        }).catch(err=>{
            this.setState({loading:false})
            alert("Sorry can't be added")
        })
    }

    onUpdate=()=>{
        this.setState({loading:true})
        const state = this.state;
        OwnerService.editOwner(state.token,state.editId,state.editName,state.editAddress,state.editNumber).then(res=>{
            this.setState({loading:false,editVisible:false});
            this.refreshPage();
        }).catch(err=>{
            this.setState({loading:false,editVisible:false})
            alert("Can't be submitted")
        })
    }

    onDelete = (id) =>{
        this.setState({loading:true})
        OwnerService.deleteOwner(this.state.token,id).then(res=>{
            this.setState({loading:false})
            this.refreshPage();
        }).catch(err=>{
            this.setState({loading:false})
            alert("Can't be deleted")
        })
    }

    render() {
        const state = this.state;
        const tableData = state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText))
        return (
           <View style={styles.container}>
                <Header title="Transactioner" navigation={this.props.navigation}/>
                <IconButton style={{position:'absolute',top:0,right:5}} icon="add" color="#fff" size={25}
                    onPress={()=>this.setState({visible:true})}
                />
                <Searchbar style={{margin:5,borderRadius:5}}
                    onChangeText={(text)=>this.setState({searchText:text})}
                    value={this.state.searchText}
                />
                {this.state.loading && <View style={styles.loaderContainer}>
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                </View> ||
                <ScrollView style={{margin:5,marginTop:0}}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row flexArr={[1, 2, 2, 2]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {/* <Rows flexArr={[1, 2, 2, 2]} data={state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText))} textStyle={styles.text}/> */}
                    {tableData.map((individualData,i)=>(
                        <Row key={i}
                            onLongPress={()=>Alert.alert(`${individualData[1]}(${individualData[2]})`,`${individualData[3]}`,[
                                {text:'Cancel'},
                                {text:'Edit',onPress:()=>this.onEditPress(individualData[4],individualData[1],individualData[2],individualData[3])},
                                {text:'Delete',onPress:()=>this.onDelete(individualData[4])}
                            ])}
                            flexArr={[1, 2, 2, 2]} data={individualData.slice(0,4)} textStyle={styles.text}/>
                    ))}
                </Table>
                </ScrollView>}
                <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({visible:false})}
                  visible={this.state.visible}>
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps='handled'>
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Add Transactioner</Text>
                            <FAB
                                icon="close"
                                color="#fff"
                                style={{width:35,height:35,backgroundColor:'#c6291c',alignItems:'center',justifyContent:'center'}}
                                onPress={()=>this.setState({visible:false})}
                            />
                        </View>
                        <Divider style={{marginVertical:10,height:2}}/>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.name}
                                label="Owner Name"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({name:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.address}
                                label="Address"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({address:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.contactNumber}
                                label="Contact Number"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({contactNumber:text})} 
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
          <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({editVisible:false})}
                  visible={this.state.editVisible}>
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps='handled'>
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Edit Transactioner</Text>
                            <FAB
                                icon="close"
                                color="#fff"
                                style={{width:35,height:35,backgroundColor:'#c6291c',alignItems:'center',justifyContent:'center'}}
                                onPress={()=>this.setState({editVisible:false})}
                            />
                        </View>
                        <Divider style={{marginVertical:10,height:2}}/>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.editName}
                                label="Owner Name"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editName:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.editAddress}
                                label="Address"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editAddress:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={`${this.state.editNumber}`}
                                label="Contact Number"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editNumber:text})} 
                                />
                        </KeyboardAvoidingView>
                        <TouchableOpacity style={[styles.submitButton,{backgroundColor:'#FF5722'}]}
                            activeOpacity={0.7}
                            onPress={()=>this.onUpdate()}
                            // disabled={!this.isValid()}
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    head: {
        backgroundColor: '#f1f8ff' 
    },
    text: {
        margin: 6 
    },
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.8)',
        flex:1,
        paddingHorizontal:'7%',
        paddingVertical:20,
        justifyContent:'center'
    },
    title:{
        fontSize:18,
        marginTop:10
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
    loaderContainer:{
        flex: 1,
        zIndex: 1111,
        backgroundColor: '#ffffff85',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
    },
    loader: {
        width: 50,
        top: '25%',
        zIndex: 11111,
        alignSelf:'center'
    }
})

export default Transactioner;