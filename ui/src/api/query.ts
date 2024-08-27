import { notifyError } from "../helper/notify";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notifyError(error.message);
    }
  })
});
