import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Header from './../Header';
import { styles} from './monthlysales.css';
import {Table,Row,Rows} from 'react-native-table-component';
import {getToken} from './../../utils';
import MonthlySalesService from './monthlySales.services';
import {IconButton} from 'react-native-paper'
const MonthArr = ['Hawa','Janauary','February','March','April','May','June','July','August','September','October','November','December']
class BhushSales extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tableHead : ['S.N.','Month','Total'],
            tableData : [],
            loading : false
         };
    }

    componentDidMount(){
        this.setState({loading:true});
        getToken().then(token=>{
            this.setState({token:token})
            MonthlySalesService.getBhushMonthlySales(token).then(res=>{
                let tableData = []
                res.reverse().map((sales,i)=>{
                    tableData.push([i+1,MonthArr[parseInt(sales.month)],sales.total])
                })
                this.setState({tableData:tableData,loading:false})
            })
        }).catch(err=>{
            this.setState({loading:false})
            alert(err)
        })
    }

    refreshState=()=>{
        this.setState({loading:true});
        getToken().then(token=>{
            this.setState({token:token})
            MonthlySalesService.getBhushMonthlySales(token).then(res=>{
                let tableData = []
                res.reverse().map((sales,i)=>{
                    tableData.push([i+1,MonthArr[parseInt(sales.month)],sales.total])
                })
                this.setState({tableData:tableData,loading:false})
            })
        }).catch(err=>{
            this.setState({loading:false})
            alert(err)
        })
    }

    render() {
        const state = this.state;
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <Header title="Bhush Monthly Sales" navigation={this.props.navigation}/>
                <IconButton style={{position:'absolute',top:0,right:5}} icon="refresh" color="#fff" size={25}
                    onPress={()=>this.refreshState()}
                />
                {this.state.loading && <View style={styles.loaderContainer}>
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                </View> || 
                <ScrollView style={{margin:5}}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row flexArr={[1,4,5]} data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows flexArr={[1,4,5]} data= {state.tableData} textStyle={styles.text} />
                    </Table>
                </ScrollView>}
            </View>
        );
    }
}

export default BhushSales;