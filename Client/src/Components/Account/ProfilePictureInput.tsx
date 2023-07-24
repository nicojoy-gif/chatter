// ProfilePictureInput.js
import React, { ChangeEvent } from 'react';
interface ProfilePictureInputProps {
    onChange: (file: File) => void;
  }
  
  const ProfilePictureInput: React.FC<ProfilePictureInputProps> = ({ onChange }) => {
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    onChange(file);
    console.log(file)
  };
  
  return (
    <input
      id='profilePictureInput'
      type='file'
      accept='image/*'
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  );
};

export default ProfilePictureInput;
