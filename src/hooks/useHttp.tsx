import { useReducer, useCallback } from "react";

enum HttpActionKind {
  SEND = "SEND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

interface HttpState<T> {
  data: T | null;
  error: string | null;
  status: HttpActionKind | null;
}

interface HttpAction<T> {
  type: HttpActionKind;
  responseData?: T;
  errorMessage?: string;
}

function httpReducer<T>(state: HttpState<T>, action: HttpAction<T>): HttpState<T> {
  switch (action.type) {
    case HttpActionKind.SEND:
      return {
        data: null,
        error: null,
        status: HttpActionKind.PENDING,
      };
    case HttpActionKind.SUCCESS:
      return {
        data: action.responseData ?? null,
        error: null,
        status: HttpActionKind.COMPLETED,
      };
    case HttpActionKind.ERROR:
      return {
        data: null,
        error: action.errorMessage ?? "Something went wrong!",
        status: HttpActionKind.COMPLETED,
      };
    default:
      return state;
  }
}

function useHttp<T>(requestFunction: () => Promise<T>) {
  //lo hago asi "httpReducer as" porque a "data" no le estaba llegando el generico <T>, lo marcaba como un unknown
  const [httpState, dispatch] = useReducer(
    httpReducer as (state: HttpState<T>, action: HttpAction<T>) => HttpState<T>,
    {
      status: HttpActionKind.PENDING,
      data: null,
      error: null,
    } as HttpState<T>
  );

  const sendRequest = useCallback(async () => {
    dispatch({ type: HttpActionKind.SEND });
    try {
      const responseData = await requestFunction();
      dispatch({ type: HttpActionKind.SUCCESS, responseData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      dispatch({
        type: HttpActionKind.ERROR,
        errorMessage,
      });
    }
  }, [requestFunction]);

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
