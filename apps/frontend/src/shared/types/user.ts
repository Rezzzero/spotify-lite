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
        userImage: string;
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
      userImage: string;
    };
  };

  subscriptions: {
    userToArtistSubs: UserToArtistSubs[];
    userToUserSubs: any[];
  };
}

export interface UserToArtistSubs {
  id?: string;
  artist_id: string;
  added_at?: string;
  user_id: string;
}

export interface UserToUserSubs {
  id: string;
  name: string;
  avatar_url: string;
  added_at: string;
  type: "user";
}
