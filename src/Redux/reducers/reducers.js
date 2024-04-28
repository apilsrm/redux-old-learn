// const LIST_ITEMS = 'LIST_ITEMS';

import { LIST_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM} from "../actions/types";
let initialState = {
  lists: [], item: {}
};

const rootReducer=(state = initialState, action)=>{
  switch(action.type){
    case LIST_ITEMS:
     return {
      ...state,
      lists: action.payload
     };

    case ADD_ITEM:
     return {
       ...state,
       lists: [...state.lists, action.payload],
       item: { ...state.item, loading: false }
    };

    case DELETE_ITEM:
      console.log('Payload:', action.payload);
      const updatedLists = state.lists.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        lists: updatedLists,
        item: { ...state.item, loading: false }
      };

      case UPDATE_ITEM:
        const editedLists = state.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        );
        return {
          ...state,
          lists: editedLists,
          item: { ...state.item, loading: false }
        };  

    default: return state;
   }

}
export default rootReducer;