// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTY4NGU3ODQ4NGFlMjg1Y2I0MjAxZSIsImlhdCI6MTU0NDk3OTgxMH0.kyAOrnMq6if_p24F4_OoNAdmUHq8Ll48oqzKGqnxxmI"
import {URL} from './../../constants';
export default class SalesService{
    static postChamalSales(token,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/chamalSales`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    customer:customer,
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

    static getChamalSales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/chamalSales`,{
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

    static editChamalSale(token,id,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/editChamalSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
                    customer:customer,
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

    static deleteChamalSale(token,id){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/deleteChamalSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
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

    static postKanikaSales(token,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/kanikaSales`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    customer:customer,
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

    static getKanikaSales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/kanikaSales`,{
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

    static editKanikaSale(token,id,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/editKanikaSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
                    customer:customer,
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

    static deleteKanikaSale(token,id){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/deleteKanikaSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
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

    static postBhushSales(token,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/bhushSales`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    customer:customer,
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

    static getBhushSales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/bhushSales`,{
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

    static editBhushSale(token,id,customer,unitPrice,noofPackets,date){
        console.warn("id",id)
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/editBhushSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
                    customer:customer,
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

    static deleteBhushSale(token,id){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/deleteBhushSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
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

    static postBranSales(token,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/branSales`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    customer:customer,
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

    static getBranSales(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/branSales`,{
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

    static editBranSale(token,id,customer,unitPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/editBranSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
                    customer:customer,
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

    static deleteBranSale(token,id){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/deleteBranSale`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':token
                },
                body:JSON.stringify({
                    id:id,
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

}