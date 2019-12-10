import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    head: {
        backgroundColor: '#f1f8ff' 
    },
    text: {
        margin: 6 
    },
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.8)',
        flex:1,
        paddingHorizontal:'7%',
        paddingVertical:20,
        justifyContent:'center'
    },
    title:{
        fontSize:18,
        marginTop:10
    },
    textInput:{
        backgroundColor:'#fff',
        fontSize:24,
        marginVertical:0,
        paddingVertical:0
    },
    submitButton:{
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'#FF5722',
        marginTop:10,
        height:40,
        width:100,
        justifyContent:'center',
        borderRadius:20
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
