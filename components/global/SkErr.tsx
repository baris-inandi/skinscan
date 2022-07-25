import React from "react";
import { IonIcon } from "@ionic/react";
import { alertCircleOutline, warningOutline } from "ionicons/icons";

interface Props {
  level: "warn" | "err";
  content: string;
}

const SkErr: React.FC<Props> = (props) => {
  return (
    <div
      className={`w-full bg-sk-${props.level}-bg text-sk-${props.level}-fg flex items-center rounded-xl p-6 gap-4`}
    >
      <IonIcon
        icon={props.level == "warn" ? warningOutline : alertCircleOutline}
        size="large"
      />
      <p className="text-left w-full text-sm leading-tight">{props.content}</p>
    </div>
  );
};

export default SkErr;
