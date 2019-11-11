import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Chamal from './chamalStock';
import Kanika from './kanikaStock';
import Bhush from './bhushStock';
import Bran from './branStock';
import Dhan from './dhanStock';
const TabNavigator = createBottomTabNavigator({
    Dhan:Dhan,
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