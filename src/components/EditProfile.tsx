import React, { FormEvent, useEffect, useState } from "react";
import {
  useEditProfileMutation,
  useGetToProfileQuery,
} from "../features/auth/authApiSlice";
import { UserData } from "../features/types/userTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const { data: userInfo, refetch } = useGetToProfileQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState<UserData>({
    _id: "",
    name: "",
    surname: "",
    email: "",
    place: "",
    role: "",
    about: "",
    department: "",
    blocked: false,
    title: "",
    webSite: "",
    profile_image: {
      public_id: "",
      url: "",
    },
    gender: "",
    dateOfBirth: new Date(),
  });

  const { name, surname, place, about, department, webSite } = user ?? {};

  useEffect(() => {
    if (userInfo?.data) {
      setUser(userInfo.data);
    }
  }, [userInfo]);

  const handleRefetchData = async() => {
    try {
      await refetch().unwrap()
    } catch (err:any) {
      if(err?.status === 401){      
        alert(err?.data?.message)
      }
    }
  }
  
  useEffect(() => {
    handleRefetchData()
  },[user])

  const [editProfile, { isLoading, isSuccess, isError, error }] =
    useEditProfileMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = await editProfile(user).unwrap();
      toast.success('Profile succesfully updated')
    } catch (err: any) {
      if (err?.status === 401) {
        dispatch(logOut());
        navigate(location.pathname);
      }
    }
  };
  return (
    <div className="w-4/5">
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleFormSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                    id="name"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="surname"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={handleInputChange}
                    id="surname"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="department"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Department
              </label>
              <input
                type="text"
                name="department"
                value={department}
                onChange={handleInputChange}
                id="department"
                placeholder="Type your department"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="place"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Place
              </label>
              <input
                type="text"
                name="place"
                value={place}
                onChange={handleInputChange}
                id="place"
                placeholder=""
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="about"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                value={about}
                onChange={handleInputChange}
                placeholder="Something about you"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="time"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Gender
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton1"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton2"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton2"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton1"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Lpg
                  </label>
                </div>
              </div>
            </div>
            <h3 className="border-b mb-5">Links</h3>
            <div className="mb-5">
              <label
                htmlFor="webSite"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                LinkedIn
              </label>
              <input
                type="url"
                name="webSite"
                id="webSite"
                value={webSite}
                onChange={handleInputChange}
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-getir-green focus:shadow-md"
              />
            </div>

            <div>
              <button className="hover:shadow-htmlForm rounded-md bg-getir-green py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
