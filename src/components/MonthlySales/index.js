import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Chamal from './chamalSales';
import Kanika from './kanikaSales';
import Bhush from './bhushSales';
import Bran from './branSales';
const TabNavigator = createBottomTabNavigator({
    Chamal: Chamal,
    Kanika: Kanika,
    Bhush:Bhush,
    Bran:Bran
},
{
  swipeEnabled: true,
  tabBarOptions:{
    tabStyle:{backgroundColor:'#fff'},
    labelStyle: {fontSize:17,alignSelf:'center',alignItems:'center',justifyContent:'center',marginBottom:10},
    activeTintColor:"#FF5722"
  }
}
);

export default createAppContainer(TabNavigator);