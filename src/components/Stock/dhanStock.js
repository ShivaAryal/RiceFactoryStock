import React, { Component } from 'react';
import { View,Picker, StyleSheet,ScrollView, Modal, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native';
import {Searchbar,IconButton, Divider,TextInput,FAB} from 'react-native-paper';
import Header from '../Header';
import { styles} from './stock.css';
import { Table, Row, Rows } from 'react-native-table-component';
import StockService from './stocks.services.js';
import DatePicker from 'react-native-datepicker';
import {getToken} from './../../utils';
class Dhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['S.N.', 'Good Name', 'Unit Price(/kg)', 'Total Quantity(kg)'],
            tableData: [],
            visible:false,
            filterMode:'Customer',
            searchText:'',
            searchMode:1,
            loading:false,
            good:'Masino Dhan'
          }
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token})
            this.setState({loading:true})
            StockService.getDhanStock(token).then(res=>{
                let tableData =[]
                res.map((datum,i)=>{
                    tableData.push([i+1,datum.good,Math.round(datum.unitPrice*100)/100,datum.noofPackets])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert("err")
            })
        })
    }

    refreshState(){
        this.setState({loading:true})
        StockService.getDhanStock(this.state.token).then(res=>{
            let tableData =[]
            res.map((datum,i)=>{
                tableData.push([i+1,datum.good,Math.round(datum.unitPrice*100)/100,datum.noofPackets])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
            alert("err")
        })
    }

    componentWillReceiveProps(){
        this.setState({loading:true})
        StockService.getDhanStock(this.state.token).then(res=>{
            let tableData =[]
            res.map((datum,i)=>{
                tableData.push([i+1,datum.good,Math.round(datum.unitPrice*100)/100,datum.noofPackets])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
            alert("err")
        })
    }

    isValid(){
        const state = this.state;
        if(state.good && state.totalPrice && state.noofPackets && state.date) return true;
        else return false;
    }

    onSubmit(){
        Keyboard.dismiss();
        const {good,totalPrice,noofPackets,date} = this.state;
        this.setState({loading:true,visible:false})
        StockService.postDhanStock(this.state.token,good,totalPrice/noofPackets,noofPackets,date).then(res=>{
            alert("Succesfully added")
            this.refreshState()
        this.setState({
            good:'Masino Dhan',
            totalPrice:'',
            noofPackets:'',
            loading:false,
            date:''
        })
        }).catch(err=>{
            this.setState({loading:false})
            alert("sorry can't be added")
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
                <Header title="Dhan Stock" navigation={this.props.navigation}/>
                <IconButton style={{position:'absolute',top:0,right:5}} icon="add" color="#fff" size={25}
                    onPress={()=>this.setState({visible:true})}
                />
                <IconButton style={{position:'absolute',top:0,right:40}} icon="refresh" color="#fff" size={25}
                    onPress={()=>this.refreshState()}
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
                    <Row flexArr={[0.8, 2, 2,2]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows flexArr={[0.8, 2, 2,2]} data={state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText))} textStyle={styles.text}/>
                </Table>
                </ScrollView>}
                <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({visible:false})}
                  visible={this.state.visible}>
                <ScrollView contentContainerStyle={styles.modalBackground} keyboardShouldPersistTaps="handled" >
                    <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Add Dhan Stock</Text>
                            <FAB
                                icon="close"
                                color="#fff"
                                style={{width:35,height:35,backgroundColor:'#c6291c',alignItems:'center',justifyContent:'center'}}
                                onPress={()=>this.setState({visible:false})}
                            />
                        </View>
                        <Divider style={{marginVertical:10,height:2}}/>
                        <Picker
                            style={{marginBottom:0}}
                            selectedValue={this.state.good}
                            onValueChange={(itemValue, itemIndex) => this.setState({good: itemValue})}
                            mode="dropdown">
                            <Picker.Item value="Masino Dhan" label="Masino Dhan" />
                            <Picker.Item value="Moto Dhan" label="Moto Dhan" />
                        </Picker>
                        <Divider style={{backgroundColor:'#FF5722',height:1.2,marginVertical:5,marginBottom:10}}/>
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.totalPrice}
                                label="Total Price"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({totalPrice:text})} 
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
           </View> 
        );
    }
}

export default Dhan;