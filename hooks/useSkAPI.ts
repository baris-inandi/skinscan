import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { get } from "../lib/store/store";
import { logout } from "../lib/auth";

interface ICameraRequest {
  success: boolean;
  id?: string;
  datauri: string;
}

const useSkAPI = () => {
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
      console.log(photo.dataUrl);
      fetch("https://skinscan.withskyfallen.com/upload", {
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
          let rspTxt = await res.text();
          if (rspTxt === "Internal Server Error") {
            logout();
          } else {
            const _id = String(JSON.parse(rspTxt).scanid);
            console.log(_id);
            out.id = _id;
            console.log(out);
            out.success = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return out;
    } catch (e) {
      console.log(e);
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

export default useSkAPI;
