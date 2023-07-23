import { createContext, useReducer, ReactNode } from "react";

interface State {
  user: any;
  isFetching: boolean;
  errors: boolean;
}

interface Action {
  type: string;
  payload?: any;
}
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;


const INITIAL_STATE: State = {
  user: initialUser,
  isFetching: false,
  errors: false,
};


interface AuthContextType {
  user: any;
  isFetching: boolean;
  errors: boolean;
  dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isFetching: false,
  errors: false,
  dispatch: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "LOGIN_START":
          return {
            ...state,
            user: {},
            isFetching: true,
            errors: false,
          };
          case "UPDATE_USER_FROM_STORAGE":
            return {
              ...state,
              user: action.payload,
              isFetching: false,
              errors: false,
            };
      
        case "LOGIN_SUCCESS":
          return {
            ...state,
            user: action.payload,
            isFetching: false,
            errors: false,
          };
        case "LOGIN_FAILURE":
          return {
            ...state,
            user: null,
            isFetching: false,
            errors: action.payload,
          };
        case "FOLLOW":
          return {
            ...state,
            user: {
              ...state.user,
              followings: [...state.user.followings, action.payload],
            },
          };
        case "UNFOLLOW":
          return {
            ...state,
            user: {
              ...state.user,
              followings: state.user.followings.filter(
                (following: any) => following !== action.payload
              ),
            },
          };

        default:
          return state;
      }
    },
    INITIAL_STATE
  );

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        errors: state.errors,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
