import {v1 as uuid} from "uuid";

export const linkReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_LINK':
            const newList=state.sort((a, b) =>b.point - a.point)  
            return [{
                name: action.link.name,
                url: action.link.url,
                point: action.link.point,
                id: uuid()
            },...newList]
       case 'REMOVE_LINK':
            return state.filter(link => link.id !== action.id)
       default:
            return state
    }
}