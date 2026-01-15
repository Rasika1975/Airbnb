
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
    const { serverUrl } = useContext(authDataContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCurrentUser = async () => {
        // Don't try to fetch if serverUrl isn't available
        if (!serverUrl) {
            console.log("serverUrl not available yet");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const result = await axios.get(
                `${serverUrl}/api/user/current-user`,
                { withCredentials: true }
            );
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.log("Error fetching user:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [serverUrl]); // Re-run when serverUrl changes

    const value = {
        userData,
        setUserData,
        loading,
        refreshUser: getCurrentUser
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;
