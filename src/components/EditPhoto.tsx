import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useUploadPhotoMutation } from '../features/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProfileImage, updateAvatar } from '../features/auth/authSlice';

const EditPhoto = () => {

  const dispatch = useDispatch()
  const [newAvatar, setNewAvatar] = useState<string | ArrayBuffer | null>();
  const [fileDetails, setFileDetails] = useState<string>();


  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const file = e.target.files[0];
      setFileDetails(file.name)
      setFileToBase(file);
      
    }   
  };
  const setFileToBase = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
       setNewAvatar(reader.result);
    };
  };
  const [uploadPhoto] = useUploadPhotoMutation()

  const submitPhoto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const avatarData = await uploadPhoto({profile_image: newAvatar}).unwrap()
      // console.log(avatarData)
      dispatch(updateAvatar(avatarData))
    } catch (error) {
      console.log(error);
    }
  };

  return (
  
    <form onSubmit={submitPhoto} className="flex flex-col items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                {newAvatar? <p className='mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>{fileDetails}</p> : ""}
            </div>
            <input onChange={handleImage} id="dropzone-file" type="file" className="hidden" />
            
        </label>
        <button type="submit" className="mb-2 font-semibold text-gray-500 dark:text-gray-400">
            Submit
          </button>
    </form> 

  )
}

export default EditPhoto