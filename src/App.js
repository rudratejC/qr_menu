import { useState, useEffect } from "react";
import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
//import { Route, useLocation} from 'react-router-dom';


function App() {
  const [newName, setNewName] = useState("");
  const [users, setUsers] = useState([]);


  var query=window.location.search;
  var USP=new URLSearchParams(query)
  var id=USP.get('id')
  var name=USP.get('name')

  if(id===null&&name===null){
    name="No Restaurant"
  }
  const usersCollectionRef = collection(db, id);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    console.log(id);
  }, []);

  return ( 
    <div className="App">
      <br></br>
      <h3>
        {name}
      </h3>
      <br>
      </br>
      
      <table>
        <tr>
          <th className="tname">Name</th>
          <th className="tprice">Price</th>
        </tr>
      </table>
      {users.map((user) => {
        return (
          <div>
          <table className="tdata">
            <tr>
              <td className="tname">{user.name}</td>
              <td className="tprice">{user.price}</td>
            </tr>
          </table>  
          </div>
        );
      })}
    </div>);
   
      

}

export default App;
