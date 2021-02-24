import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  // set global authentication state
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userEmail, setUserEmail] = useState();

  const login = useCallback((uid, token, email, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserEmail(email);

    // if a token expiration date is found, use it. otherwise, generate a new one
    const tokenExpiresAt =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiresAt);

    // store userData in local storage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        userEmail: email,
        expiration: tokenExpiresAt.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserEmail(null);

    // remove userData from local storage
    localStorage.removeItem('userData');
  }, []);

  // on page load, check for a valid token in local storage. if found, login the user
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() // auth token hasn't expired yet
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.userEmail,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  // when auth token expires, logout the user
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId, userEmail };
};
