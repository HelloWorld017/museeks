const listeners = {};

const listenAction = (action, listener, priority = 5) => {
    if (!listeners[action]) listeners[action] = [];
    listeners[action].push({
        listener,
        priority
    });
    
    listeners[action] = listeners[action].sort((a, b) => a.priority - b.priority);
};

const emitAction = (store) => (next) => (action) => {
    let count = 0;
	
    if(!listeners[action.type]) return next(action);
    listeners[action.type].every((v) => {
        v(store, action, (err) => {
            if (err) return false;
            count++;
            
            if (count === listeners[action.type].length) next();
        });
    });
};

export { listenAction, emitAction };