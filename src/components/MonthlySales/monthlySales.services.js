import {URL} from './../../constants';

export default class MonthlySalesService{
    static getChamalMonthlySales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/chamalMonthlySales`,{
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
            }).catch(err=>reject(err))
        })
    }

    static getKanikaMonthlySales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/kanikaMonthlySales`,{
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
            }).catch(err=>reject(err))
        })
    }

    static getBranMonthlySales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/branMonthlySales`,{
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
            }).catch(err=>reject(err))
        })
    }

    static getBhushMonthlySales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/bhushMonthlySales`,{
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
            }).catch(err=>reject(err))
        })
    }

}