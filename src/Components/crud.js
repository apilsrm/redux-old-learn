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