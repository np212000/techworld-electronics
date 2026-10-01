import { createContext, useContext, useEffect, useState } from "react";

//Create a context for authentication-related data and functions.
const AuthContext = createContext();

//AuthProvider will make authentication available throught application.
export function AuthProvider({children})
{
  //Store the currently logged in, restore that user from localstorage.
  const [currentUser, setCurrentUser] = useState(()=>
  {
    const savedUser = localStorage.getItem("techwolrd-current-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //Store all registerd users.
  const [users, setUsers] = useState(()=>
  {
    const savedUsers = localStorage.getItem("techworld-users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  // Whenever the users array changes, save it to localStorage.
  useEffect(()=>
  {
    localStorage.setItem("techworld-users", JSON.stringify(users));
  },[users]);

  // Whenever the current user changes, update localStorage.
  useEffect(()=>
  {
    if(currentUser)
    {
      localStorage.setItem("techworld-current-user",JSON.stringify(currentUser));
    }

    else
    {
      localStorage.removeItem("techworld-current-user");
    }
  },[currentUser]);

  //Register a new user.
  const registerUser = (name, email, password) =>
  {
    //Check whether an account with this email already exists.
    const existingUser = users.find((user)=>user.email.toLowerCase() === email.toLowerCase());

    if(existingUser)
    {
      return {success: false, message : "An account with this email already exists.",};
    }

    //Create a simple user object
    //Password storage here is only for this frontend simulation.
    const newUser = 
    {
      id : Date.now(), 
      name,
      email : email.toLowerCase(),
      password,
      createdAt : new Date().toISOString(),
      orders: [],
    };

    //Add the new user to the users array.
    setUsers((previousUsers) => [...previousUsers, newUser]);
    return {success : true, message : "Account created successfully.",};
  };
  
  //Login an existing user.
  const loginUser = (email, password) =>
  {
    //Find a user with matching email and password.
    const user = users.find((item)=>
    item.email.toLowerCase() === email.toLowerCase() &&
    item.password === password);

    //If no matching user was found, return an error.
    if(!user)
    {
      return {success : false, message : "Invalid email or password.",};
    }

    //save the logged-in user in state.
    setCurrentUser(user);

    return {success : true, message : "Login successful."};
  };

  //Logout the currently logged-in user.
  const logoutUser = () =>
  {
    setCurrentUser(null);
  };

  //Add Order
  const addOrder = (order) =>
  {
    //we cannot create an order without a logged-in user.
    if(!currentUser)
    {
      return {success : false, message : "Please login before placing an order."};
    }

    //Create the updated user with the new order.
    const updateUser = {...currentUser, orders: [...(currentUser.orders || []), order],};

    //Update the currently logged-in user.
    setCurrentUser(updateUser);

    //Also update the samr user inside the complete users list.
    setUsers((previousUsers)=> previousUsers.map((user)=>
    user.id === currentUser.id ? updateUser : user));
    
    return {success : true, message : "Order added successfully."};
  };

  //Provides authentication data and functions to the entire application.
  const value = {currentUser, users, registerUser, loginUser, logoutUser, addOrder,
  isLoggedIn : Boolean(currentUser),};


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

//Custom hook to easily access authentication data.
export function UseAuth()
{
  return useContext(AuthContext);
}

export default AuthProvider;