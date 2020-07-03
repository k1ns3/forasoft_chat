export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      return state;
  }
};
