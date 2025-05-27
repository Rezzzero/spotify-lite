export interface UserInfo {
  userName: string;
  email: string;
  password: string;
}

export interface UserInfoErrors {
  email: {
    status: boolean;
    message: string;
  };
  password: {
    noLetter: boolean;
    noNumberOrSpecial: boolean;
    tooShort: boolean;
  };
  userName: {
    status: boolean;
    message: string;
  };
}

export interface UserInfoBlur {
  userName: boolean;
  email: boolean;
  password: boolean;
}

export interface StepErrors {
  email: boolean;
  password: boolean;
  userName: boolean;
}
