export interface UserInfo {
  email: string;
  password: string;
  userName: string;
  birthday: number | null;
  monthOfBirthday: number | null;
  yearOfBirthday: number | null;
  gender: string;
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
  birthday: {
    status: boolean;
    message: string;
  };
  monthOfBirthday: {
    status: boolean;
    message: string;
  };
  yearOfBirthday: {
    status: boolean;
    message: string;
  };
  gender: {
    status: boolean;
    message: string;
  };
}

export interface UserInfoBlur {
  email: boolean;
  password: boolean;
  userName: boolean;
  birthday: boolean;
  monthOfBirthday: boolean;
  yearOfBirthday: boolean;
}

export interface StepErrors {
  email: boolean;
  password: boolean;
  additionalInfo: {
    userName: boolean;
    birthday: boolean;
    monthOfBirthday: boolean;
    yearOfBirthday: boolean;
    gender: boolean;
  };
}
