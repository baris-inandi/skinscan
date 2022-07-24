import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { get } from "../lib/store/store";

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
      fetch("/api/upload", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: await get("currentUserToken"),
          file: photo.dataUrl!.replace("data:image/jpeg;base64","")
        })
      }).then((res) => {
        alert("Scan submitted.")
      }).catch((error) => {
        alert(error)
      })
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
