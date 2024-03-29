import { useContext, useState, useEffect, createContext } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(1);
    const [email, setEmail] =useState('')
    // const [isGUser, setIsGUser] = useState(false);
    const [userD, setUserD] = useState('');
    const logIn = (userData, role,email) => {
        setRole(role);
        setUserD(userData);
        setEmail(email)
        // setIsGUser(isGUser);
        localStorage.setItem('role', role);
        localStorage.setItem('email',JSON.stringify(email));
        // localStorage.setItem('isGUser', isGUser);
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    // const logOut = () => {
    //     if(isGUser){
    //         googleLogout();
    //     }
    //     // setIsAuth(false);
    //     setIsGUser(false);
    //     sessionStorage.clear();
    // }
    useEffect(() => {
        const storedrole = localStorage.getItem('role');
        const stdEmail = localStorage.getItem('email');
        // const storedIsGUser = sessionStorage.getItem('isGUser');
        const userData = JSON.parse(localStorage.getItem('UserData'));
        // if (storedIsAuth === 'true') {
            // setIsGUser(storedIsGUser);
            setRole(storedrole);
            setUserD(userData);
            setEmail(stdEmail)
        // }
    }, [])
    return (
        <AuthContext.Provider value={{ role,setRole, userD, logIn, setUserD, email}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};