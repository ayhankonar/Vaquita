import React, {useContext} from 'react';
import { MyContext } from '../hooks/context'

function Profile() {
  const {user}  = useContext(MyContext)
  // console.log("PROFILE:" + user.email)


  return user ? (
    <div>
      <h2>Welcome, {user.firstName}</h2>
      <img src={user.image} alt=""/>
    </div>
  ):
    <div>
    <h2>Welcome</h2>
    </div>
}

export default Profile;