import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { get } from "../lib/store/store";

const useCamera = () => {
  const takePhoto = async (fromPhotos: boolean) => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: fromPhotos ? CameraSource.Photos : CameraSource.Prompt,
        quality: 25,
        presentationStyle: "popover",
        allowEditing: true,
      });
      fetch("http://skinscan.withskyfallen.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: await get("currentUserToken"),
          file: photo.base64String!,
        }),
      })
        .then(async (res) => {
          let scanid = (await res.json()).scanid
          alert("Scan submitted");
        })
        .catch((error) => {
          alert(error);
        });
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
