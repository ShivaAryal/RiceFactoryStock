import { AsyncStorage } from 'react-native'

export const getToken = () =>{
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('USERDATA')
        .then(res => {
          let result = JSON.parse(res);
          resolve(result.token);
        })
        .catch(err => reject(err));
    });
  }