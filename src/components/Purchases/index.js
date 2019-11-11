import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,Modal,TouchableOpacity,Text,KeyboardAvoidingView, ActivityIndicator,Alert } from 'react-native';
import PurchasesService from './purchases.services';
import Header from '../Header';
import { Table, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker'
import {getToken} from './../../utils';
import {Searchbar,Divider,TextInput,FAB} from 'react-native-paper';
class Purchases extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }
    
    constructor(props) {
        super(props);
        this.state = { 
            tableHead: ['S.N.', 'Good', 'Unit Price', 'Total Quantity(kg)','Date'],
            tableData: [],
            editVisible:false,
            loading:false,
            searchText:''
         };
    }

    refreshPage=()=>{
        this.setState({loading:true})
        PurchasesService.getPurchases(this.state.token).then(res=>{
            let tableData=[]
            res.map((purchase,i)=>{
                tableData.push([i+1,purchase.good,Math.round(purchase.unitPrice*100)/100,purchase.noofPackets,purchase.date,purchase._id])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
        })
    }

    componentWillReceiveProps(){
        this.refreshPage()
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token,loading:true})
            PurchasesService.getPurchases(token).then(res=>{
                let tableData=[]
                res.reverse().map((purchase,i)=>{
                    tableData.push([i+1,purchase.good,Math.round(purchase.unitPrice*100)/100,purchase.noofPackets,purchase.date,purchase._id])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert(err.message)
            })
        })
    }

    onEditPress=(id,good,unitPrice,noofPackets,date)=>{
        this.setState({editId:id,editVisible:true,editGood:good,editTotal:unitPrice*noofPackets,editPackets:noofPackets,editDate:date})
    }

    onUpdate=()=>{
        const state = this.state;
        this.setState({loading:true})
        PurchasesService.editPurchase(state.token,state.editId,state.editGood,state.editTotal/state.editPackets,state.editPackets,state.editDate).then(res=>{
            this.setState({editVisible:false,loading:false})
            this.refreshPage();
        }).catch(err=>{
            this.setState({editVisible:false,loading:false})
        })
    }

    onDelete=(id)=>{
        this.setState({loading:true})
        PurchasesService.deleteDhanPurchase(this.state.token,id).then(res=>{
            this.setState({loading:false})
            this.refreshPage();
        }).catch(err=>{
            this.setState({loading:false})
        })
    }

    render() {
        const state = this.state;
        let d = new Date();
        d.setDate(d.getDate() - 15);
        let a = new Date();
        a.setDate(a.getDate()+15)
        const tableData = state.tableData.filter(x=>x[1].includes(this.state.searchText))
        return (<View style={styles.container}>
            <Header title="Dhan Purchases" navigation={this.props.navigation}/>
            <Searchbar style={{margin:5,borderRadius:0}}
                onChangeText={(text)=>this.setState({searchText:text})}
                value={state.searchText}
            />
            {this.state.loading && <View style={styles.loaderContainer}>
            <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
            </View> ||
            <ScrollView style={{margin:5,marginTop:0}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row flexArr={[1,2,2,1.5,2]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                {tableData.map((individualData,i)=>(
                    <Row key={i}
                        onLongPress={()=>Alert.alert(`${individualData[1]}(${individualData[2]})`,`${individualData[3]}`,[
                            {text:'Cancel'},
                            {text:'Edit',onPress:()=>this.onEditPress(individualData[5],individualData[1],individualData[2],individualData[3],individualData[4])},
                            {text:'Delete',onPress:()=>this.onDelete(individualData[5])}
                        ])}
                        flexArr={[1,2,2,1.5,2]} data={individualData.slice(0,5)} textStyle={styles.text} 
                    />
                ))}
            </Table>
            </ScrollView>}
            <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({editVisible:false})}
                  visible={this.state.editVisible}>
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps="handled">
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Edit Dhan Purchase</Text>
                            {/* <MaterialIcons name="close" size={25} color="#000"  style={{alignSelf:'center'}}
                                onPress={()=>this.setState({visible:false})}
                            /> */}
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
                                value={this.state.editGood}
                                label="Good"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editGood:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={`${this.state.editTotal}`}
                                label="Total Amount"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editTotal:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={`${this.state.editPackets}`}
                                label="Total Quantity"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editPackets:text})} 
                                />
                        </KeyboardAvoidingView>
                        <DatePicker
                            style={{width:'100%',borderColor:'#fff',marginTop:15}}
                            date={this.state.editDate}
                            mode="date"
                            placeholder={<Text style={{fontSize:17,alignSelf:'flex-start',left:0,paddingLeft:0,color:'#757575'}}>Date</Text>}
                            format="YYYY-MM-DD"
                            minDate={d}
                            maxDate={a}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({editDate: date})}}
                            customStyles={{
                                dateIcon:{
                                    shadowColor:'#f00'
                                },
                                dateInput: {
                                    borderWidth:0,
                                    left:0
                                }
                            }}
                        />
                        <Divider style={{backgroundColor:'#FF5722',height:1.2,marginVertical:5}}/>
                        <TouchableOpacity style={[styles.submitButton,{backgroundColor:'#FF5722'}]}
                            activeOpacity={0.7}
                            onPress={()=>this.onUpdate()}
                            // disabled={!this.isValid()}
                        >
                            <Text style={{fontSize:20,color:'#fff'}}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
          </Modal>     
        </View>    
        );
    }
}

export default Purchases;

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
