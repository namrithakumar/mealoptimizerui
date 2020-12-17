import { ShoppingItem } from '../../../../../app/shared/model/shopping-item-model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingList {
  shoppingItems: ShoppingItem[];
  editedshoppingItem: ShoppingItem;
  editedshoppingItemIndex: number;
}

const defaultShoppingList: ShoppingList = {
  shoppingItems: [],
  editedshoppingItem: null,
  editedshoppingItemIndex: -1
};

export function shoppingListReducer(
  state: ShoppingList = defaultShoppingList,
  action: ShoppingListActions.ShoppingListActions) {

  let updatedShoppingList : ShoppingItem[] = null;
  
  switch (action.type) {
    
    case ShoppingListActions.ADD_INGREDIENT:
      updatedShoppingList = (verifyIfShoppingItemExists(action.payload, state.shoppingItems))?mergeWithExistingShoppingItem(action.payload, state.shoppingItems):addNewShoppingItem(action.payload, state.shoppingItems); 
      
      return {
        ...state,
        shoppingItems: updatedShoppingList
      };
    
    case ShoppingListActions.ADD_INGREDIENTS:
      updatedShoppingList = state.shoppingItems;
      action.payload.forEach((shoppingItem : ShoppingItem) => {
        updatedShoppingList = (verifyIfShoppingItemExists(shoppingItem, updatedShoppingList))?mergeWithExistingShoppingItem(shoppingItem, updatedShoppingList):addNewShoppingItem(shoppingItem, updatedShoppingList); 
      });
    
      return {
        ...state,
        shoppingItems: updatedShoppingList
      };
    
    case ShoppingListActions.UPDATE_INGREDIENT:

      if(!action.payload.itemNameUpdated) {
        updatedShoppingList = updateCurrentShoppingList(action.payload.shoppingItem, state.shoppingItems);
      }
      //If name is updated, check if we can merge it with an existing item in the list
      else {
        updatedShoppingList = (verifyIfShoppingItemExists(action.payload.shoppingItem, state.shoppingItems))?mergeWithExistingShoppingItem(action.payload.shoppingItem, state.shoppingItems):addNewShoppingItem(action.payload.shoppingItem, state.shoppingItems); 
      }

      return {
        ...state,
        shoppingItems: updatedShoppingList,
        editedshoppingItemIndex: -1,
        editedshoppingItem: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        shoppingItems: state.shoppingItems.filter((ig, igIndex) => {
          return igIndex !== state.editedshoppingItemIndex;
        }),
        editedshoppingItemIndex: -1,
        editedshoppingItem: null
      };
    
    case ShoppingListActions.START_EDIT:
      
      return {
        ...state,
        editedshoppingItemIndex: action.payload,
        editedshoppingItem: { ...state.shoppingItems[action.payload] }
      };
    
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedshoppingItem: null,
        editedshoppingItemIndex: -1
      };
    
    default:
      return state;
  }
}

function verifyIfShoppingItemExists(newShoppingItem : ShoppingItem, currentShoppingList : ShoppingItem[]) : boolean {
  let shoppingItemExists : boolean = false;
    currentShoppingList.forEach((existingShoppingItem : ShoppingItem) => {
      if(!shoppingItemExists && existingShoppingItem.name.toLowerCase() === newShoppingItem.name.toLowerCase())
      shoppingItemExists = true;
    });
    return shoppingItemExists;
  }

function mergeWithExistingShoppingItem(newShoppingItem : ShoppingItem, currentShoppingList : ShoppingItem[]) : ShoppingItem[] {
  let updatedShoppingList : ShoppingItem[] = currentShoppingList.slice();
  let shoppingItemMerged : boolean = false;
  let mergedShoppingItem : ShoppingItem = null;
  currentShoppingList.forEach((existingShoppingItem : ShoppingItem, index : number) => {
    if(!shoppingItemMerged && (existingShoppingItem.name.toLowerCase() === newShoppingItem.name.toLowerCase())) {
    mergedShoppingItem = new ShoppingItem(existingShoppingItem.name, newShoppingItem.amount + existingShoppingItem.amount, existingShoppingItem.measure, existingShoppingItem.labels);
      updatedShoppingList[index] = mergedShoppingItem;
      shoppingItemMerged = true;
  }});
  return updatedShoppingList;
}

function addNewShoppingItem(newShoppingItem : ShoppingItem, currentShoppingList : ShoppingItem[]) : ShoppingItem[] {
  let updatedShoppingList : ShoppingItem[] = currentShoppingList.slice();
  updatedShoppingList.push(newShoppingItem);
  return updatedShoppingList;
}

function updateCurrentShoppingList(editedShoppingItem : ShoppingItem, currentShoppingList : ShoppingItem[]) : ShoppingItem[] {
  let updatedShoppingList : ShoppingItem[] = currentShoppingList.slice();
  currentShoppingList.forEach((existingShoppingItem : ShoppingItem, index : number) => {
    if(existingShoppingItem.name.toLowerCase() === editedShoppingItem.name.toLowerCase())
      updatedShoppingList[index] = editedShoppingItem;
  });
  return updatedShoppingList;
}