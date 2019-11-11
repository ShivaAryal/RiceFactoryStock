import React, { Component } from 'react';
import { View,Dimensions } from 'react-native';
import {createDrawerNavigator,createAppContainer} from 'react-navigation';
import Home from './Home';
import Sales from './Sales';
import Purchases from './Purchases';
import Transactioner from './Transactioner';
import Stock from './Stock';
import Expense from './Expense';
import Drawer from './Drawer';
import Login from './Login';
import Settings from './Settings';
import MonthlySales from './MonthlySales';
import MonthlyPurchases from './MonthlyPurchases';
import { Constants } from 'expo';
const AppNavigator = createDrawerNavigator({
    Login:{screen:Login},
    Home:{screen:Home},
    Sales:{screen:Sales},
    Purchases:{screen:Purchases},
    Transactioner:{screen:Transactioner},
    Stock:{screen:Stock},
    Expense:{screen:Expense},
    Drawer:{screen:Drawer},
    Settings:{screen:Settings},
    MonthlySales:{screen:MonthlySales},
    MonthlyPurchases:{screen:MonthlyPurchases}
  },{
      initialRouteName:'Login',
      headerMode:'none',
      drawerPosition:'left',
      drawerWidth:Dimensions.get('window').width*0.7,
      contentComponent:Drawer,
      drawerLockMode: 'locked-closed'
  });

  const App = createAppContainer(AppNavigator)

  export default function Route(){
      return(
          <View style={{flex:1}}>
            <View style={{backgroundColor: "#FF5722",height: Constants.statusBarHeight}} />
            <App/>
          </View>
      )
  }