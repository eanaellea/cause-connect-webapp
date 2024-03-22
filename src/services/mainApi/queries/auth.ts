import { query } from "../setup";
import { handleError } from "../setup/helpers";

export const loginQuery = async (
  body: any,
): Promise<any | null> => {
  try {
    const result = await query.post("auth/login", {
      json: body,
    });
    const json = await result.json<any>();
    return json;
  } catch (e) {
    handleError(e as Error);
    return null;
  }
};
