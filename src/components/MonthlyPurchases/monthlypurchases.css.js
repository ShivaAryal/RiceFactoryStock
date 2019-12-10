import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
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