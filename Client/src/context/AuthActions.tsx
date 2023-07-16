interface UserCredentials {
  emails: string;
  passwords: string;
}

interface Action {
  type: string;
  payload?: any;
}
export const LoginStart = (user: UserCredentials): Action => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: any): Action => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error: any): Action => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId: any) => ({
  type: "FOLLOW",
  payload: userId,
});

export const UnFollow = (userId: any) => ({
  type: "UNFOLLOW",
  payload: userId,
});
