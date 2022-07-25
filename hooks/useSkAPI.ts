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
        resultType: CameraResultType.DataUrl,
        source: fromPhotos ? CameraSource.Photos : CameraSource.Prompt,
        quality: 50,
        presentationStyle: "popover",
        allowEditing: true,
      });
      console.log(photo.dataUrl);
      let out: ICameraRequest = {
        success: false,
        id: undefined,
        datauri: photo.dataUrl!,
      };
      console.log(photo.dataUrl);
      const b64list = photo.dataUrl!.split(",");
      const b64 = b64list[b64list.length -1];
      console.log("b64, ", b64);
      const res = await fetch("https://skinscan.withskyfallen.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: await get("currentUserToken"),
          file: b64,
        }),
      });
      let rspTxt = await res.text();
      if (rspTxt === "Internal Server Error") {
        logout();
      } else {
        const _id = String(JSON.parse(rspTxt).scanid);
        out.id = _id;
        out.success = true;
      }
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
