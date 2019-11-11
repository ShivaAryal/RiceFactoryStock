// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTY4NGU3ODQ4NGFlMjg1Y2I0MjAxZSIsImlhdCI6MTU0NDk3OTgxMH0.kyAOrnMq6if_p24F4_OoNAdmUHq8Ll48oqzKGqnxxmI"
import {URL} from './../../constants';

export default class HomeService{
    static getMonthlySalesData(token){
        return new Promise((resolve,reject)=>{
            fetch(`${URL}/api/sales/monthlySales`,{
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

    // static getMonthlyExpenseData(){
    //     return new Promise((resolve,reject)=>{
    //         fetch(`http://${IP}:4000/api/expense/monthlyExpenses`,{
    //             method:'GET',
    //             headers:{
    //                 'Authorization':token
    //             }
    //         }).then(res=>res.json()).then(info=>{
    //             if(info.status=='success'){
    //                 resolve(info.data)
    //             }else{
    //                 reject(info.message)
    //             }
    //         }).catch(err=>reject(err))
    //     })
    // }

    // static getYearlyData(token){
    //     return new Promise((resolve,reject)=>{
    //         fetch('http://api/fejfejfe',{
    //             method:GET,
    //             headers:{
    //                 'Authorization':token
    //             }
    //         }).then(res=>res.json())
    //         .then(resolve(res.body))
    //     }).catch(err=>reject(err))
    // }

    // static getFiscalSales(token){
    //     return new Promise((resolve,reject)=>{
    //         fetch('http://api/jbfjebjf',{
    //             method:GET,
    //             headers:{
    //                 'Authorization':token
    //             }
    //         }).then(res=>res.json())
    //     }).catch(err=>reject(err))
    // }

}