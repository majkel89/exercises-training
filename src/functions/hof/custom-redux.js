export const createStore = (reducerFn, state = {}) => {
    const listeners = [];
    const actions = [];

    const notifyAll = () =>
        listeners.forEach(listener => listener(state));

    return {
        getState() {
            return state;
        },
        subscribe(listenerFn) {
            listeners.push(listenerFn);
            return () => {
                const idx = listeners.indexOf(listenerFn);
                listeners.splice(idx, 1);
            };
        },
        dispatch(action) {
            actions.push(action);
            state = reducerFn(state, action);
            notifyAll();
        },
        replaceReducer(newReducer) {
            reducerFn = newReducer;
            state = actions.reduce(reducerFn);
            notifyAll();
        },
    };
};

const store = createStore((state = {}) => state);
