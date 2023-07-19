import React, { useState } from "react";
import axios from "axios";

interface PictureUploaderProps {
  userId: string;
  pictureType: string;
  currentPicture: string;
  onUpdatePicture: (newPicture: string) => void;
}

function PictureUploader({
  userId,
  pictureType,
  currentPicture,
  onUpdatePicture,
}: PictureUploaderProps) {
  const [selectedPicture, setSelectedPicture] = useState<string>(
    currentPicture || ""
  );

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPicture = reader.result as string;
      setSelectedPicture(newPicture);

      if (file) {
        const formData = new FormData();
        formData.append(pictureType, file);
        axios
          .put(`https://chattered.onrender.com/api/users/${userId}`, formData)
          .then((res) => {
            console.log(`${pictureType} updated successfully`);
            onUpdatePicture(newPicture);
          })
          .catch((error) => {
            console.error(`Failed to update ${pictureType}`, error);
          });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img src={selectedPicture || currentPicture} alt="picture" />

      <input type="file" accept="image/*" onChange={handlePictureChange} />
    </div>
  );
}

export default PictureUploader;
