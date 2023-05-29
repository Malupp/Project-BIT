export interface Users {
  id: string;
  username: string;
  password: string;
  email: string;
  creationDate: Date;
  role: Role;
}

export type Role = "ADMIN" | "USER";
