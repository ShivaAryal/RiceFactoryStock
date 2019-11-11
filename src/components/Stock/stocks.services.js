// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTY4NGU3ODQ4NGFlMjg1Y2I0MjAxZSIsImlhdCI6MTU0NDk3OTgxMH0.kyAOrnMq6if_p24F4_OoNAdmUHq8Ll48oqzKGqnxxmI"
import {URL} from './../../constants';

export default class StockService{
    static getDhanStock(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/stock/dhanStock`,{
                method:'GET',
                headers:{
                    'Authorization':token
                }
            }).then(res=>res.json()).then(info=>{
                if(info.status=="success"){
                    resolve(info.data)
                }else{
                    reject(info.message)
                }
            }).catch(err=>reject(err))
        })
    }
    static postDhanStock(token,good,unitPacketPrice,noofPackets,date){
        return new Promise((resolve,reject)=>{
        fetch(`${URL}/api/stock/dhanStock`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':token
            },
            body:JSON.stringify({
                good:good,
                unitPrice:parseInt(unitPacketPrice),
                noofPackets:parseInt(noofPackets),
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
static getChamalStock(token){
    return new Promise((resolve,reject)=>{
        fetch(`${URL}/api/stock/chamalStock`,{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then(res=>res.json()).then(info=>{
            if(info.status=="success"){
                resolve(info.data)
            }else{
                reject(info.message)
            }
        }).catch(err=>reject(err))
    })
}
static postChamalStock(token,good,unitPacketPrice,noofPackets){
    return new Promise((resolve,reject)=>{
    fetch(`${URL}/api/stock/chamalStock`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':token
        },
        body:JSON.stringify({
            good:good,
            unitPrice:parseInt(unitPacketPrice),
            noofPackets:parseInt(noofPackets),
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
static getBranStock(token){
    return new Promise((resolve,reject)=>{
        fetch(`${URL}/api/stock/branStock`,{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then(res=>res.json()).then(info=>{
            if(info.status=="success"){
                resolve(info.data)
            }else{
                reject(info.message)
            }
        }).catch(err=>reject(err))
    })
}
static postBranStock(token,good,unitPacketPrice,noofPackets){
    return new Promise((resolve,reject)=>{
    fetch(`${URL}/stock/branStock`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':token
        },
        body:JSON.stringify({
            good:good,
            unitPrice:parseInt(unitPacketPrice),
            noofPackets:parseInt(noofPackets),
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
static getBhushStock(token){
    return new Promise((resolve,reject)=>{
        fetch(`${URL}/api/stock/bhushStock`,{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then(res=>res.json()).then(info=>{
            if(info.status=="success"){
                resolve(info.data)
            }else{
                reject(info.message)
            }
        }).catch(err=>reject(err))
    })
}
static postBhushStock(token,good,unitPacketPrice,noofPackets){
    return new Promise((resolve,reject)=>{
    fetch(`${URL}/api/stock/bhushStock`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':token
        },
        body:JSON.stringify({
            good:good,
            unitPrice:parseInt(unitPacketPrice),
            noofPackets:parseInt(noofPackets),
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
static getKanikaStock(token){
    return new Promise((resolve,reject)=>{
        fetch(`${URL}/api/stock/kanikaStock`,{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then(res=>res.json()).then(info=>{
            if(info.status=="success"){
                resolve(info.data)
            }else{
                reject(info.message)
            }
        }).catch(err=>reject(err))
    })
}
static postKanikaStock(token,good,unitPacketPrice,noofPackets){
    return new Promise((resolve,reject)=>{
    fetch(`${URL}/api/stock/kanikaStock`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':token
        },
        body:JSON.stringify({
            good:good,
            unitPrice:parseInt(unitPacketPrice),
            noofPackets:parseInt(noofPackets),
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
}