import React, { Component } from 'react';
import { View,Text,ScrollView, TouchableOpacity,Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import PureChart from 'react-native-pure-chart';
import Header from '../Header';
import {styles} from './home.css';
import HomeService from './home.services';
import {getToken} from './../../utils';
const months = ['hawa','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
class Home extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode:'unlocked'
    }
    constructor(props) {
        super(props);
        this.state = { 
            mode:'M',
            monthlyData:[],
            profitData:[],
            yearlyData:[],
            yearlyProfit:[],
            loading:false,
            currentMonthSale:'',
            currentMonthProfit:''
         };
    }
    onPressMode=(mode)=>{
        this.setState({
            mode:mode
        })
    }

    componentWillReceiveProps(){
        let d = new Date()
        let currentMonth = d.getMonth()
        this.setState({loading:true})
        HomeService.getMonthlySalesData(this.state.token).then(res=>{    
            let graphData = []
            let profitData = []
            res.map(monthSale=>{
                if(currentMonth+1==monthSale.month){
                    this.setState({currentMonthSale:monthSale.total,currentMonthProfit:Math.round(monthSale.profit*100)/100})
                }
                graphData.push({"x":months[parseInt(monthSale.month)],"y":parseInt(monthSale.total)})
                profitData.push({"x":months[parseInt(monthSale.month)],"y":parseInt(monthSale.profit)})
            })
            this.setState({monthlyData:graphData,profitData:profitData , loading:false})
        }).catch(err=>{
            this.setState({loading:false})
            alert("mot found")
        })
    }

    componentDidMount(){
        let d = new Date()
        let currentMonth = d.getMonth()
        getToken().then(token=>{
            this.setState({token:token})
            this.setState({loading:true})
            HomeService.getMonthlySalesData(token).then(res=>{    
                let graphData = []
                let profitData = []
                res.map(monthSale=>{
                    if(parseInt(currentMonth+1)==parseInt(monthSale.month)){
                        this.setState({currentMonthSale:monthSale.total,currentMonthProfit:Math.round(monthSale.profit*100)/100})
                    }
                    graphData.push({"x":months[parseInt(monthSale.month)],"y":parseInt(monthSale.total)})
                    profitData.push({"x":months[parseInt(monthSale.month)],"y":parseInt(monthSale.profit)})
                })
                this.setState({monthlyData:graphData,profitData:profitData , loading:false})
            }).catch(err=>{
                this.setState({loading:false})
                alert("mot found")
            })
        })
    }

    render() {
        return (
          <View style={{flex:1}}>
              <Header title="Home" navigation={this.props.navigation}/>
              {this.state.loading && <View style={styles.loaderContainer}>
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                </View> ||
              <ScrollView style={{backgroundColor:'#fff'}}>
              <View style={styles.modeView}>
                <TouchableOpacity style={[styles.modeButton,{backgroundColor:this.state.mode=='Y' && '#FF5722' || '#E0E0E0'}]}
                    onPress={()=>this.onPressMode('Y')}
                    disabled={true}>
                    <Text style={{color:this.state.mode=='Y'  && '#fff' || '#000',fontSize:20}}>Y</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modeButton,{backgroundColor:this.state.mode=='M' && '#FF5722' || '#E0E0E0'}]}
                    onPress={()=>this.onPressMode('M')}>
                <Text style={{color:this.state.mode=='M'  && '#fff' || '#000',fontSize:20}}>M</Text>
                </TouchableOpacity>
              </View>
              {this.state.mode=='M' && <View>
              <View style={styles.salesView}>
                <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-60}]}>
                    <Text style={{alignSelf:'center'}}>{this.state.currentMonthSale} rs</Text>
                    <Text style={{alignSelf:'center'}}>This Month Sale</Text>
                </View>
                <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-60}]}>
                    <Text style={{alignSelf:'center'}}>{this.state.currentMonthProfit} rs</Text>
                    <Text style={{alignSelf:'center'}}>This Month Profit</Text>
                </View>
              </View>
              {/* graph view */}
              <View style={{paddingHorizontal:10}}>
              <ScrollView style={{marginTop:20,alignSelf:'center'}} horizontal={true} >
                <PureChart 
                    data={this.state.monthlyData}
                    type='line' 
                    height={200} 
                    width={'100%'} 
                    showEvenNumberXaxisLabel={false}/>
                </ScrollView>
                <Text style={{marginLeft:20}}>Monthly Sales</Text>
                <ScrollView style={{marginTop:30,alignSelf:'center'}} horizontal={true} >
                <PureChart 
                    data={this.state.profitData}
                    type='line' 
                    height={200} 
                    width={'100%'} 
                    showEvenNumberXaxisLabel={false}/>
                </ScrollView>
                <Text style={{marginLeft:20}}>Monthly Profits</Text>
                </View>
                {/* <View style={[styles.salesView,{marginHorizontal:20,marginVertical:20}]}>
                <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-10}]}>
                    <Text style={{alignSelf:'center'}}>30000 rs</Text>
                    <Text style={{alignSelf:'center'}}>Predicted Next Month Sale</Text>
                </View>
                <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-10}]}>
                    <Text style={{alignSelf:'center'}}>2000 rs</Text>
                    <Text style={{alignSelf:'center'}}>Predicted Next Month Profit</Text>
                </View>
                </View> */}
                </View> ||
                <View>
                <View style={[styles.salesView]}>
                  <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-60}]}>
                      <Text style={{alignSelf:'center'}}>2000 rs</Text>
                      <Text style={{alignSelf:'center'}}>This Year Sale</Text>
                  </View>
                  <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-60}]}>
                      <Text style={{alignSelf:'center'}}>2000 rs</Text>
                      <Text style={{alignSelf:'center'}}>This Year Profit</Text>
                  </View>
                </View>
                {/* graph view */}
                <View style={{marginTop:20}} >
                  <PureChart 
                      data={this.state.yearlyData}
                      type='line' 
                      height={200} 
                      width={'100%'} 
                      showEvenNumberXaxisLabel={false}/>
                  </View>
                  <Text style={{marginLeft:20}}>Yearly Sales</Text>
                  <View style={{marginTop:30}} >
                  <PureChart 
                      data={this.state.yearlyProfit}
                      type='line' 
                      height={200} 
                      width={'100%'} 
                      showEvenNumberXaxisLabel={false}/>
                  </View>
                  <Text style={{marginLeft:20}}>Yearly Profits</Text>
                  {/* <View style={[styles.salesView,{marginHorizontal:10,marginVertical:20}]}>
                  <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-10}]}>
                      <Text style={{alignSelf:'center'}}>300000 rs</Text>
                      <Text style={{alignSelf:'center'}}>Predicted Next Year Sale</Text>
                  </View>
                  <View style={[styles.salesIView,{width:Dimensions.get('window').width/2-10}]}>
                      <Text style={{alignSelf:'center'}}>20000 rs</Text>
                      <Text style={{alignSelf:'center'}}>Predicted Next Year Profit</Text>
                  </View>
                </View> */}
                  </View>
            }
              </ScrollView>}
          </View>  
        );
    }
}

export default Home;