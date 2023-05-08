export interface IUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    gender: string;
    role: string;
    department: string;
    dateOfBirth: Date;
    // createdAt: Date;
    about: string;
    place: string;
    webSite: string;
    profile_image: {
      public_id: string;
      url: string;
    };
    // ratings: {
    //   user: string;
    //   star: number;
    // }[];
    // comments: string[];
    // blocked: boolean;
    // resetPasswordToken: string;
    // resetPasswordExpire: Date;
    // __v: number;

}


