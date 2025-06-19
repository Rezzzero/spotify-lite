export interface UserData {
  session: {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: {
      email: string;
      id: string;
      user_metadata: {
        gender: string;
        userName: string;
        birthday: string;
        monthOfBirthday: string;
        yearOfBirthday: string;
        imageUrl: string;
      };
    };
  };
  user: {
    email: string;
    id: string;
    user_metadata: {
      gender: string;
      userName: string;
      birthday: string;
      monthOfBirthday: string;
      yearOfBirthday: string;
      imageUrl: string;
    };
  };
}
