// export interface IUser {
//     _id: string;
//     name: string;
//     surname: string;
//     email: string;
//     gender: string;
//     role: string;
//     department: string;
//     dateOfBirth: Date;
//     // createdAt: Date;
//     about: string;
//     place: string;
//     webSite: string;
//     profile_image: {
//       public_id: string;
//       url: string;
//     };
//     // ratings: {
//     //   user: string;
//     //   star: number;
//     // }[];
//     // comments: string[];
//     // blocked: boolean;
//     // resetPasswordToken: string;
//     // resetPasswordExpire: Date;
//     // __v: number;

// }
export interface IUser {
  success: boolean
  data: UserData[]
}

export interface IUserDetails {
  success: boolean
  data: UserData
}

export interface UserData {
  profile_image: ProfileImage
  _id: string
  name: string
  email: string
  role: string
  place: string
  blocked: boolean
  //createdAt: string
  // __v: number
  title: string
  webSite: string
  gender: string;
  dateOfBirth: Date;
  courses?: any[]
  comments?: any[]
  ratings?: Rating[]
  surname: string
  department: string
  about: string
}

export interface ProfileImage {
  public_id: string
  url: string
}

export interface Rating {
  user: string
  star: number
  _id: string
}
