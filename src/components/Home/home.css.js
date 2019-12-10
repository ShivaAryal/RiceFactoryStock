import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    modeView:{
        flexDirection:'row',
        alignSelf:'flex-end',
        marginVertical:5
    },
    modeButton:{
        width:30,
        height:30,
        borderRadius:25,
        marginRight:7,
        alignItems:'center',
        justifyContent:'center'
    },
    salesView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:30
    },
    salesIView:{
        borderWidth:1,
        borderBottomWidth:2,
        borderColor:'#F5F5F5',
        borderRadius:5
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
      },
    
})
