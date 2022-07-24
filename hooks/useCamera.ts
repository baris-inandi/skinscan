import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const useCamera = () => {
  const takePhoto = async (fromPhotos: boolean) => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: fromPhotos ? CameraSource.Photos : CameraSource.Prompt,
        quality: 25,
        presentationStyle: "popover",
        allowEditing: true,
      });
      console.log(photo.dataUrl);
      return photo;
    } finally {
      return undefined;
    }
  };

  return {
    takePhoto,
  };
};

export default useCamera;
