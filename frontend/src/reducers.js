import handlePostReducer from './handlePostReducer';

function rootReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_POSTS':
            console.log('rootReducer', state);
            state = handlePostReducer(state, action);
            console.log(state);
            break;
        default:
            return state;
    }
    return state;
}

export default rootReducer;