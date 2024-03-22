import { loginQuery } from "@/services/mainApi/queries/auth";
import { useGlobalStore } from "../store";
import { GlobalStore } from "../types";

export const loginAction = async (body: any): Promise<void> => {
  const setState = useGlobalStore.setState;
  const response = await loginQuery(body);

  if (response === null) {
    return;
  }

  setState({ token: response.token });

  // fetchMyInfoAction();

  /*
  router.push("/");
  Toast.show({ type: "success", text1: "You are connected !" });
  */
};

export const setTokenAction = (newToken: string) => {
  useGlobalStore.setState((state: GlobalStore) => ({...state, token: newToken}));
}
