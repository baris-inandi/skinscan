import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { get } from "../lib/store/store";

interface ICameraRequest {
  success: boolean;
  id?: string;
  datauri: string;
}

const useCamera = () => {
  const takePhoto = async (fromPhotos: boolean): Promise<ICameraRequest> => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: fromPhotos ? CameraSource.Photos : CameraSource.Prompt,
        quality: 25,
        presentationStyle: "popover",
        allowEditing: true,
      });
      let out: ICameraRequest = {
        success: false,
        id: undefined,
        datauri: photo.dataUrl!,
      };
      fetch("http://skinscan.withskyfallen.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: await get("currentUserToken"),
          file: photo.base64String!,
        }),
      }).then(async (res) => {
        const _id = String((await res.json()).scanid);
        out.id = _id;
        out.success = true;
      });
      return out;
    } finally {
      return {
        success: false,
        id: undefined,
        datauri: "",
      };
    }
  };

  return {
    takePhoto,
  };
};

export default useCamera;
