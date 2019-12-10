import React, { Component } from 'react';
import { View,ScrollView, Modal, Text, TouchableOpacity,Alert, KeyboardAvoidingView,Keyboard,ActivityIndicator} from 'react-native';
import {Searchbar,IconButton, Divider,TextInput,FAB} from 'react-native-paper';
import Header from '../Header';
import { styles} from './sales.css'
import { Table, Row, Rows } from 'react-native-table-component';
import SalesService from './sales.services';
import DatePicker from 'react-native-datepicker'
import {getToken} from './../../utils';
class Chamal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['S.N.', 'Customer', 'Unit Price(/kg)', 'Total Quantity(kg)','Date','Total'],
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
        SalesService.getChamalSales(this.state.token).then(res=>{
            let tableData =[]
            res.reverse().map((datum,i)=>{
                tableData.push([i+1,datum.customer,Math.round(datum.unitPrice*100)/100,datum.noofPackets,datum.date,datum.total,datum._id])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
            alert(err.message)
        })
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token})
            this.setState({loading:true})
            SalesService.getChamalSales(token).then(res=>{
                let tableData =[]
                res.reverse().map((datum,i)=>{
                    tableData.push([i+1,datum.customer,Math.round(datum.unitPrice*100)/100,datum.noofPackets,datum.date,datum.total,datum._id])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert(err.message)
            })
        })
    }

    componentWillReceiveProps(){
        this.refreshPage()
    }

    isValid(){
        const state= this.state;
        if(state.customer && state.totalAmount && state.noofPackets ) return true;
        else return false;
    }

    onSubmit=()=>{
        this.setState({loading:true,visible:false})
        Keyboard.dismiss();
        const state = this.state;
        SalesService.postChamalSales(state.token,state.customer,state.totalAmount/state.noofPackets,state.noofPackets,state.date).then(res=>{
            alert("successfully submitted")
            this.refreshPage();
            this.setState({
                customer:'',
                unitPrice:'',
                noofPackets:'',
                totalAmount:'',
                date:'',
                loading:false
            })
        }).catch(err=>{
            this.setState({loading:false})
            alert(err.message)
        })
    }

    onEditPress=(id,editCustomer,editPackets,editDate,editTotal)=>{
        this.setState({editVisible:true,editId:id,editCustomer:editCustomer,editPackets:editPackets,editDate:editDate,editTotal:editTotal})
    }

    onUpdate=()=>{
        const state = this.state;
        this.setState({loading:true})
        SalesService.editChamalSale(state.token,state.editId,state.editCustomer,state.editTotal/state.editPackets,state.editPackets,state.editDate).then(res=>{
            this.setState({loading:false,editVisible:false});
            this.refreshPage();
        }).catch(err=>{
            this.setState({loading:false,editVisible:false})
            alert("Can't be updated")
        })
    }

    onDelete = (id) =>{
        this.setState({loading:true})
        SalesService.deleteChamalSale(this.state.token,id).then(res=>{
            this.setState({loading:false})
            this.refreshPage();
        }).catch(err=>{
            this.setState({loading:false})
            alert("Can't be deleted")
        })
    }

    render() {
        const state = this.state;
        let d = new Date();
        d.setDate(d.getDate() - 15);
        let a = new Date();
        a.setDate(a.getDate()+15)
        return (
           <View style={styles.container}>
                <Header title="Chamal Sales" navigation={this.props.navigation}/>
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
                    <Row flexArr={[1, 2, 2, 2,2,2]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {/* <Rows flexArr={[1, 2, 2, 2,2,2]} data={state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText))} textStyle={styles.text}/> */}
                    {state.tableData.map((individualData,i)=>(
                        <Row 
                        key={i}
                        onLongPress={()=>Alert.alert(`${individualData[1]}(${individualData[3]})`,individualData[4],[
                            {text:'Cancel'},
                            {text:'Edit',onPress:()=>this.onEditPress(individualData[6],individualData[1],individualData[3],individualData[4],individualData[5])},
                            {text:'Delete',onPress:()=>this.onDelete(individualData[6])}
                        ])} 
                        flexArr={[1,2,2,2,2,2]} data={individualData.slice(0,6)} textStyle={styles.text}/>
                    ))}
                </Table>
                </ScrollView>}
                <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({visible:false})}
                  visible={this.state.visible}>
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps="handled">
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Add Chamal Sales</Text>
                            {/* <MaterialIcons name="close" size={25} color="#000"  style={{alignSelf:'center'}}
                                onPress={()=>this.setState({visible:false})}
                            /> */}
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
                                value={this.state.customer}
                                label="Customer"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({customer:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.totalAmount}
                                label="Total Amount"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({totalAmount:text})} 
                                />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.noofPackets}
                                label="Total Quantity"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({noofPackets:text})} 
                                />
                        </KeyboardAvoidingView>
                        <DatePicker
                            style={{width:'100%',borderColor:'#fff',marginTop:15}}
                            date={this.state.date}
                            mode="date"
                            placeholder={<Text style={{fontSize:17,alignSelf:'flex-start',left:0,paddingLeft:0,color:'#757575'}}>Date</Text>}
                            format="YYYY-MM-DD"
                            minDate={d}
                            maxDate={a}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({date: date})}}
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
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps="handled">
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Edit Chamal Sales</Text>
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
                                value={this.state.editCustomer}
                                label="Customer"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editCustomer:text})} 
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

export default Chamal;