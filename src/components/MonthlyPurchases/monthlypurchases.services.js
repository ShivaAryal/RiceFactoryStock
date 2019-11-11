import {URL} from './../../constants';

export default class MonthlyPurchase{
    static getMonthlyPurchases(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/owner/monthlyPurchases`,{
                method:'GET',
                headers:{
                    'Authorization':token
                }
            }).then(res=>res.json()).then(info=>{
                if(info.status=='success'){
                    resolve(info.data)
                }else{
                    reject(info.message)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }
}