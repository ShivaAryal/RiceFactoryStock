import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Header from './../Header';
import {Table,Row,Rows} from 'react-native-table-component';
import MonthlyPurchaseService from './monthlypurchases.services';
import {getToken} from './../../utils';
const MonthArr = ['Hawa','January','February','March','April','May','June','July','August','September','October','November','December']

class MonthlyPurchases extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }

    constructor(props) {
        super(props);
        this.state = { 
            tableHead : ['S.N.','Month','Total'],
            tableData : [],
            loading : false
         };
    }

    componentDidMount(){
        this.setState({loading:true})
        getToken().then(token=>{
            MonthlyPurchaseService.getMonthlyPurchases(token).then(res=>{
                let tableData = []
                res.reverse().map((purchase,i)=>{
                    tableData.push([i+1,MonthArr[parseInt(purchase.month)],Math.round(purchase.total*100)/100])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
            })
        })
    }

    componentWillReceiveProps(){
        this.setState({loading:true})
        getToken().then(token=>{
            MonthlyPurchaseService.getMonthlyPurchases(token).then(res=>{
                let tableData = []
                res.reverse().map((purchase,i)=>{
                    tableData.push([i+1,MonthArr[parseInt(purchase.month)],Math.round(purchase.total*100)/100])
                })
                this.setState({tableData:tableData,loading:false})
            }).catch(err=>{
                this.setState({loading:false})
            })
        })
    }

    render() {
        const state = this.state;
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Header title="Monthly Purchases" navigation={this.props.navigation}/>
                {this.state.loading && <View style={styles.loaderContainer}>
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                </View> ||
                <ScrollView style={{margin:5}}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row flexArr={[0.7, 2,2]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows flexArr={[0.7, 2,2]} data={state.tableData} textStyle={styles.text}/>
                </Table>
                </ScrollView>}
            </View>
        );
    }
}

export default MonthlyPurchases;

const styles = StyleSheet.create({
    head: {
        backgroundColor: '#f1f8ff' 
    },
    text: {
        margin: 6 
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