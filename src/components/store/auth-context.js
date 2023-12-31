import React, {useState,useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogout : ()=>{}
})

export const AuthContextProvider = (props)=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserLoggedInState = localStorage.getItem("isLoggedIn");
    
        if (checkUserLoggedInState === "1") {
          setIsLoggedIn(true);
        }
      }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.setItem("isLoggedIn", "0");
        setIsLoggedIn(false);
      };

    return <AuthContext.Provider value={{isLoggedIn:isLoggedIn, onLogout:logoutHandler, onLogin:loginHandler}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;