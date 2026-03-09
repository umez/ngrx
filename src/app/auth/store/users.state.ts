
export interface User {
  id: number;
  email: string;
}

export interface UsersState {
  user: User | null;
}

export const initialUsersState: UsersState = {
  user: null,
};


