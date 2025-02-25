export const initialStore = () => ({
  message: null,
  contacts: [],
});

export default function storeReducer(state, action = {}) {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}
