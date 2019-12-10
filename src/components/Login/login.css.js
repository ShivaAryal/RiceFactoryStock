import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    button:{
        height:40,
        width:80,
        borderRadius:5,
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:18,
        color:'#fff'
    },
    loaderContainer:{
        flex: 1,
        zIndex: 1111,
        backgroundColor: 'rgba(255,255,255,0.4)',
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