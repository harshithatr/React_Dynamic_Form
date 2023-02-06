import logo from './logo.svg';
import './App.css';
import React, {useState, Fragment, useEffect} from 'react';

function App() {
  
        const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //boolean state to know whether the component is in "edit mode" or not
  const [editMode, setEditMode] = useState(false);
 //it is an object state that holds the data of the user being edited
  const [editUser, setEditUser] = useState({});
  //currentEdit is a state that holds the index of the current user being edited
  const [currentEdit, setCurrentEdit] = useState(null);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [favoritedUsers, setFavoritedUsers] = useState({});

  console.log(data, 'data');
  console.log(favoriteUsers, 'Favorite Users')
  function handleSubmit(e) {
    e.preventDefault();
    setData([...data, { name, email }]);
    setName('');
    setEmail('');
  }

  function handleRemove(e, removeUser) {
    e.preventDefault();
    //   //  let copyData =[...data]
//   //  let removed = copyData.filter(i=>{
//   //     if(i.email === removeuser){
//   //       return false;
//   //     }
//   //     else
//   //     {
//   //       return true;
//   //     }
//   //   }
//   //  )
    let copyData = [...data];
    let index = copyData.findIndex(i => i.email === removeUser.email);
    if (index !== -1) {
      copyData.splice(index, 1);
    }
    setData(copyData);
  }

  function handleEdit(e, user) {
    e.preventDefault();
    if (editMode) {
      handleUpdate(e);
    } else {
      setEditMode(true);
      setEditUser(user);
      setName(user.name);
      setEmail(user.email);
      setCurrentEdit(user.email);
    }
  }
  
  function handleUpdate(e) {
    e.preventDefault();
    let copyData = [...data];
    let index = copyData.findIndex(i => i.email === editUser.email);
    //if the email is not found in the array
    if (index !== -1) {
      copyData[index] = { name, email };
    }
    setData(copyData);
    setEditMode(false);
    setEditUser(null);
    setName('');
    setEmail('');
    setCurrentEdit(null);
  }
  function handleFavorite(e, user){
    e.preventDefault();
    if (!favoritedUsers[user.email]) {
      //add a new key-value pair, [user.email]: true. 
      //This sets the value of the email property of user to true in the favoritedUsers object.
      setFavoritedUsers({ ...favoritedUsers, [user.email]: true });
      setFavoriteUsers([...favoriteUsers, user]);
    }
  }
  function handleUnFavorite(e, user){
    e.preventDefault();
    let copyData =[...favoriteUsers];
    let removed = copyData.filter(i => i.email !== user.email);
    setFavoritedUsers({...favoritedUsers, [user.email]: false});
    setFavoriteUsers(removed);
    
    // const updatedFavoritedUsers = Object.fromEntries(
    //   Object.entries(favoritedUsers).filter(([key, value]) => key !== user.email)
    // );
    // const updatedFavoritedUsers = {...favoritedUsers};
    // delete updatedFavoritedUsers[user.email];
    // setFavoritedUsers(updatedFavoritedUsers);
    // setFavoriteUsers(favoriteUsers.filter(u => u.email !== user.email));
  }
  return (
    <div>
      <table id="users">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Remove User</th>
          <th>Edit User</th>
          <th>Favorite User</th>
          <th>UnFavorite User</th>
        </tr>
        </thead>
        {data.map(i => {
          return (
            
            <tbody>
            <tr>
              <td>
                {currentEdit === i.email ? (
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                ) : (
                  i.name
                )}
              </td>
              <td>
                {currentEdit === i.email ? (
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                ) : (
                  i.email
                )}
              </td>
              <td>
                <button onClick={e => handleRemove(e, i)}>Remove</button>
              </td>
              <td>
                <button onClick={e => handleEdit(e, i)}>{editMode && currentEdit === i.email ? 'Update' : 'Edit'}</button>
              </td>
              <td>
                <button disabled={favoritedUsers[i.email]} onClick={e => handleFavorite(e, i)}>Favorite</button>
              </td>
              <td>
                <button disabled={!favoritedUsers[i.email]} onClick={e => handleUnFavorite(e, i)}>UnFavorite</button>
              </td>
            </tr>
            </tbody>
          );
        })}
      </table>
      <table id ="users">
        <thead>
          <tr>
            <th>Current Favorite Users</th>
          </tr>
        </thead>
      <tbody>{favoriteUsers.map(i=>{return(
              <tr>
                <td>{i.name}</td>
                <td>{i.email}</td>
              </tr>
            );})}</tbody>
            </table>
      <label>Enter your Name:</label>
      <input type="name" onChange={e => setName(e.target.value)} />
      <label>Enter your Email:</label>
      <input type="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
}


export default App;
