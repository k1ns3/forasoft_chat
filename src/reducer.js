export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      };

    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
        roomsIds: action.payload.roomsIds,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'SET_ROOMS':
      return {
        ...state,
        roomsIds: action.payload,
      };

    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
