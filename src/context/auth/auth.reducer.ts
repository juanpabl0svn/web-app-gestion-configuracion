export default function authReducer(
  state: string,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuth: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
