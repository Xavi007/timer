export const projectListReducer = (state, action) => {
  switch (action.type) {
    case "SET_PARTY_LIST":
      return {
        ...state,
        projectList: action.payload,
      };
    //do something.

    default:
      return state;
  }
};
