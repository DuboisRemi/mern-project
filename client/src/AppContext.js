import { createContext } from "react";

const UserContext = createContext({
  uId: "default",
  loading: true,
  setUid: () => {},
});

export default UserContext;
