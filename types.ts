export type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type Note = {
  title: string;
  text: string;
  pinned?: boolean;
};
