import {URL} from './../../constants';

export default class PurchasesService{
    static getPurchases(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/owner/dhanPurchases`,{
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

    static editPurchase(token,id,good,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/owner/editDhanPurchase`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
                    good:good,
                    unitPrice:unitPrice,
                    noofPackets:noofPackets,
                    date:date
                })
            }).then(res=>res.json()).then(info=>{
                if(info.status=='success'){
                    resolve(info.data)
                }else{
                    reject(info.message)
                }
            }).catch(err=>reject(err))
        })
    }

    static deleteDhanPurchase(token,id){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/owner/deleteDhanPurchase`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id
                })
            }).then(res=>res.json()).then(info=>{
                if(info.status =='success'){
                    resolve(info.data)
                }else{
                    reject(info.message)
                }
            }).catch(err=>reject(err))
        })
    }
}