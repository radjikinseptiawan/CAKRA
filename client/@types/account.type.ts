export type AccountProfileSchema = {
  username: string;
  password: string;
  email: string;
  fullname: string;
  number_phone: string;
  confirm_password: string;
};

export type LoginSchema = {
  username: string;
  password: string;
};

export type EmployeeType = {
  Profile: {
    fullname: string;
    number_phone: string;
    role: string;
    email: string;
  };
  username: string;
  account_id: string;
};
