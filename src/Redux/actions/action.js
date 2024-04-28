import { listArray } from '../../utils/data';

import { LIST_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEMS, DELETE_ITEM, CHECKED_ITEM, ALL_CHECKED } from "./types";

export const getItems = () => {
  return { 
    type: LIST_ITEMS,
    payload: listArray
  }
};
export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};
export const updateItem = item => {
  return {
    type: UPDATE_ITEM,
    payload: item
  };
};
export const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    payload: item
  }
}
