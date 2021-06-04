import {demoType} from "./action";
const data = {
    name: '姜泥',
    age: 16
}
export function demoReducer(state= data,{type,...args}){
    switch(type){
        case demoType.UPDATE:
            return {...state,...args};
        default:
            return state;
    }
}
