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
    default:
      return state;
  }
}
