import {
  UserInfo,
  UserInfoErrors,
  UserInfoBlur,
  StepErrors,
} from "../types/NewUser";

export const initialUserInfo: UserInfo = {
  email: "",
  password: "",
  userName: "",
  birthday: null,
  monthOfBirthday: null,
  yearOfBirthday: null,
  gender: "",
};

export const initialUserInfoBlur: UserInfoBlur = {
  email: false,
  password: false,
  userName: false,
  birthday: false,
  monthOfBirthday: false,
  yearOfBirthday: false,
  gender: false,
};

export const initialUserInfoErrors: UserInfoErrors = {
  email: { status: false, message: "" },
  password: { noLetter: false, noNumberOrSpecial: false, tooShort: false },
  userName: { status: false, message: "" },
  birthday: { status: false, message: "" },
  monthOfBirthday: { status: false, message: "" },
  yearOfBirthday: { status: false, message: "" },
  gender: { status: false, message: "" },
};

export const initialStepErrors: StepErrors = {
  email: false,
  password: false,
  additionalInfo: {
    userName: false,
    birthday: false,
    monthOfBirthday: false,
    yearOfBirthday: false,
    gender: false,
  },
};
