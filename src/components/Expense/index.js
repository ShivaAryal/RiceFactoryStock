import React, { Component } from 'react';
import { View,Alert,Keyboard,ScrollView, Modal, Text, TouchableOpacity, KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import {Searchbar,IconButton, Divider,TextInput,FAB} from 'react-native-paper';
import Header from '../Header';
import {styles} from './expense.css';
import { Table, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker'
import ExpenseService from './expense.services'
import {getToken} from './../../utils'
class Expense extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['S.N.', 'Name', 'Date','Price'],
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
        ExpenseService.getCurrentExpenses(this.state.token).then(res=>{
            let tableData = []
            res.reverse().map((expense,i)=>{
                tableData.push([i+1,expense.name,expense.date,expense.price,expense._id])
            })
            this.setState({tableData:tableData,loading:false})
        }).catch(err=>{
            this.setState({loading:false})
            alert(err)
        })
    }

    componentDidMount(){
        getToken().then(token=>{
            this.setState({token:token})
            this.setState({loading:true})
            ExpenseService.getCurrentExpenses(token).then(res=>{
                let tableData = []
                res.reverse().map((expense,i)=>{
                    tableData.push([i+1,expense.name,expense.date,expense.price,expense._id])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert(err)
            })
        })
    }

    componentWillReceiveProps(){
       this.refreshPage();
    }

    isValid(){
        const state = this.state;
        if(state.name && state.date && state.price) return true
        else return false;
    }

    onSubmit(){
        Keyboard.dismiss();
        const {name,date,price} = this.state;
        this.setState({loading:true,visible:false})
        ExpenseService.postExpense(this.state.token,name,date,price).then(res=>{
            alert("Successfully added")
            this.refreshPage();
            this.setState({
                name:'',
                date:'',
                price:'',
                loading:false
            })
        }).catch(err=>{
            this.setState({loading:false})
            alert("sorry can't be added")
        })
    }

    calculateTotal(){
        let total = 0
        this.state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText)).map((datum,i)=>{
            total = total + parseInt(datum[3])
        })
        return total;
    }

    onEditPress=(id,name,date,price)=>{
        this.setState({editVisible:true,editId:id,editName:name,editDate:date,editPrice:price})
    }

    onUpdate=()=>{
        this.setState({loading:true})
        const state = this.state;
        ExpenseService.editExpense(state.token,state.editId,state.editName,state.editDate,state.editPrice).then(res=>{
            this.setState({loading:false,editVisible:false})
            this.refreshPage();
            // alert('Successfully Updated')
        }).catch(err=>{
            this.setState({loading:false,editVisible:false})
            alert("Can't be updated")})
    }
    
    onDelete=(id)=>{
        this.setState({loading:true})
        ExpenseService.deleteExpense(this.state.token,id).then(res=>{
            this.setState({loading:false})
            this.refreshPage();
            // alert('Successfully deleted')
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
        const tableData = state.tableData.filter(x=>x[this.state.searchMode].includes(this.state.searchText))
        return (
           <View style={styles.container}>
                <Header title="This Month Expense" navigation={this.props.navigation}/>
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
                    <Row flexArr={[0.7, 2,2, 1.5]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {tableData.map((individualData,i)=>(
                        <Row key={i} 
                        onLongPress={()=>Alert.alert(`${individualData[1]}(${individualData[2]})`,individualData[3],[
                            {text:'Cancel'},
                            {text:'Edit',onPress:()=>this.onEditPress(individualData[4],individualData[1],individualData[2],individualData[3])},
                            {text:'Delete',onPress:()=>this.onDelete(individualData[4])}
                        ])} 
                        flexArr={[0.7,2,2,1.5]} data={individualData.slice(0,4)} textStyle={styles.text}/>
                    ))}
                    <Row flexArr={[0.5,'',2,1.5]}  data={['','','Total',this.calculateTotal()]} style={styles.head} textStyle={styles.text}/>
                </Table>
                </ScrollView>}
                <Modal
                  transparent={true}
                  onRequestClose={()=>this.setState({visible:false})}
                  visible={this.state.visible}>
                <ScrollView contentContainerStyle={styles.modalBackground}
                    keyboardShouldPersistTaps="handled">
                     <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Add Expense</Text>
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
                                label="Name"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({name:text})} 
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
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.price}
                                label="Price"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({price:text})} 
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
                <ScrollView contentContainerStyle={styles.modalBackground}
                    keyboardShouldPersistTaps="handled">
                     <View style={{backgroundColor:'#fff',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20,marginLeft:10,marginVertical:5}}>Edit Expense</Text>
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
                                label="Name"
                                // inputStyle={styles.labelText}
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editName:text})} 
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
                        <KeyboardAvoidingView style={{marginBottom:10}}>
                            <TextInput style={styles.textInput}
                                theme={{ colors: { primary: "#FF5722" }}}
                                value={this.state.editPrice}
                                label="Price"
                                keyboardType="numeric"
                                underlineColor='#FF5722'
                                onChangeText={(text)=>this.setState({editPrice:text})} 
                                />
                        </KeyboardAvoidingView>
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

export default Expense;