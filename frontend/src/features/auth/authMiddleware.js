export const authMiddleware = store => next => action => {
    const result = next(action);

    if (action.type === 'auth/login/fulfilled' || action.type === 'auth/register/fulfilled') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userId', action.payload.userId);
        localStorage.setItem('username', action.payload.username);
    }

    if (action.type === 'auth/logout') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }

    return result;
};
