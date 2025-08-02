import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js'


export const AuthContext = createContext({user: ''});

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };



    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

//With HOC(higher-order component)
export const withAuth = (Component) => {
    const AuthWrapper = (props) => {
        const context = useContext(AuthContext);

        return <Component {...props} auth={context}/>
    }

    return AuthWrapper
};