export default function authReducer(
  state: { isAuth: boolean; username: string; name: string },
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "LOG_IN":
      return {
        isAuth: true,
        ...action.payload,
      };
    case "LOG_OUT":
      return {
        isAuth: false,
        list: [],
        username: "",
        name: "",
      };
    case "UPDATE_LIST":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
