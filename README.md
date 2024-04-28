# Old Redux Readme

This README provides an overview of how to use the Old Redux library in a JavaScript project. In this example, we have a simple to-do list application that uses Redux for state management. We'll cover the main components: actions, reducers, and the store.

## Prerequisites

Before you start, make sure you have Node.js and Yarn installed on your system. You can download and install them from the official websites:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Project Structure

The project has the following structure:

```
src/
  actions/
    types.js
    actions.js
  reducers/
    rootReducer.js
  utils/
    data.js
  store.js
```

## Installation

To set up the project and use Old Redux, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Change to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Actions

In Redux, actions are used to describe changes to the state. In your project, actions are defined in the `actions.js` file and associated action types are defined in the `types.js` file. Here's an example of the actions:

```javascript
// actions.js

import { listArray } from '../../utils/data';
import { LIST_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./types";

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
```

## Reducers

Reducers specify how the state of your application changes in response to actions. In your project, reducers are defined in the `rootReducer.js` file. Here's an example of the reducer:

```javascript
// rootReducer.js

import { LIST_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../actions/types";

let initialState = {
  lists: [],
  item: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default rootReducer;
```

## Store

The store is where the application state is held. In your project, the store is configured in the `store.js` file. Here's an example:

```javascript
// store.js

import { createStore } from "redux";
import reducer from "../reducers";

const store = createStore(reducer);

export default store;
```

## Usage

Now that you have set up your actions, reducers, and store, you can use Redux to manage your application state.

In your React components, you can connect to the Redux store using the `react-redux` library and dispatch actions to modify the state.

```javascript
// Example of connecting a component to Redux /src/components/crud.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems ,addItem,deleteItem,updateItem} from "../Redux/actions/action";
import { EuiTable, EuiTableHeader, EuiTableHeaderCell, EuiTableBody, EuiTableRow, EuiTableRowCell, EuiButton,EuiFieldSearch, EuiSpacer, EuiFlexGroup, EuiFlexItem  } from '@elastic/eui';
import { v4 } from 'uuid';




const Table = () => {
    // list all items start
    const dispatch = useDispatch();
    const { lists } = useSelector(state => state.lists);
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);
    // list all items end

    //add actions starts
    const [add ,setAdd] = useState({
        "title":"",
        "description":"",
        "completed":true

    })
    const handleInputs =(e)=>{
        e.preventDefault();
        const {name, value} = e.target;
        setAdd({...add, [name]:value});
    }
    const addDataHandle = () =>{
        const {title,description,completed} =add;
        const id = v4();
        const newDataInput = {
             id,
             title,
             description,
             completed
        }
        if( add.title !== '' && add.description !== ''){
            dispatch(addItem(newDataInput));
            setAdd({
                "title":"",
                "description":""
            })
            window.alert("Data added sucessfully");
        }
    }
    // end of add new items

    // delete action starts
    const deleteHandle =(list)=>{
       dispatch(deleteItem(list));
       window.alert('item deleted Successfully');
    }
    // delete action ends

    // update action start
    const [edit ,setEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const editItemHandle =(id)=>{
        const updatedItem = lists.find((item) => item.id === id);
        setAdd({
            ...add,
            id:id,
            title:updatedItem.title,
            description:updatedItem.description,
            completd:updatedItem.completed
        })
        setEdit(true);
    }
    const updateDataHandle=()=>{
        const { id,title,description ,completed} = add;
        const updatedItem = {
            id,
            title,
            description,
            completed
        }
        dispatch(updateItem(updatedItem));
        setAdd({
            "title":"",
            "description":"",
            "completed":"",
        })
        window.alert("data updated successfully");
        setEdit(false);

    }




    return (
        <div className="App">
          <EuiSpacer size="m"/> 
          <EuiFlexGroup>
            <EuiFlexItem grow={false} size="m">
              <EuiFieldSearch placeholder="type your title.............." name="title" onChange={handleInputs} value={add.title} />
            </EuiFlexItem>  
            <EuiFlexItem grow={false} size="m">
              <EuiFieldSearch placeholder="type your description........" name="description" onChange={handleInputs} value={add.description}/>
            </EuiFlexItem>
            <EuiFlexItem grow={false} size="m">
             {edit ? <EuiButton color="primary" onClick={updateDataHandle}>Update</EuiButton> :<EuiButton color="primary" onClick={addDataHandle}>Add</EuiButton>} 
            </EuiFlexItem>
          </EuiFlexGroup>
    
     
          <EuiSpacer size="m"/> 
          <EuiTable>
            <EuiTableHeader>
                <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                <EuiTableHeaderCell>Title</EuiTableHeaderCell>
                <EuiTableHeaderCell>Description</EuiTableHeaderCell>
                <EuiTableHeaderCell>Completed</EuiTableHeaderCell>
                <EuiTableHeaderCell>Action</EuiTableHeaderCell>
            </EuiTableHeader>
            <EuiTableBody>
                {lists.map((eachData, i) => (
                    <EuiTableRow key={i}>
                        <EuiTableRowCell>{i + 1}</EuiTableRowCell>
                        <EuiTableRowCell>{eachData.title}</EuiTableRowCell>
                        <EuiTableRowCell>{eachData.description}</EuiTableRowCell>
                        <EuiTableRowCell>{eachData.completed ? 'Yes' : 'No'}</EuiTableRowCell>
                        <EuiTableRowCell>
                           <EuiButton onClick={() => editItemHandle(eachData.id)}>Edit</EuiButton>
                           <EuiButton color="danger" onClick={() => deleteHandle(eachData)}>Delete</EuiButton>
                        </EuiTableRowCell>
                    </EuiTableRow>
                ))}
            </EuiTableBody>
        </EuiTable>
        </div>
     


    );
};

export default Table;
```

```javascript
// Example of connecting a component to Redux /src/app.js
import './App.css';

import { Provider } from "react-redux";
import store from "./Redux/store/store";
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiProvider, EuiText } from '@elastic/eui';

import Table from './Components/crud';

const App = () => {
  return (
    <EuiProvider colorMode="light">
      <Provider store={store}>
        <Table/>
      </Provider>
    </EuiProvider>
  );
}

export default App;


```

## Running the Application

To run the application, you can use the following command:

```bash
yarn start
```

This will start your development server and allow you to interact with your Redux-powered to-do list application.

## Conclusion

This README provides a basic overview of setting up and using Old Redux in your JavaScript project. By following these steps, you can implement Redux for state management and manage the state of your application in a predictable and centralized manner.