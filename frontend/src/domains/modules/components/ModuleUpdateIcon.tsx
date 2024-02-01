import { LuActivity } from "react-icons/lu";
import { LivrableUpdateEnum } from "../type";

const updateStatusLabel = ["On track", "At risk", "Off track"];

export const ModuleUpdateIcon: React.FC<{ status: number }> = ({ status }) => {
  const color =
    status != LivrableUpdateEnum.OnTrack
      ? status === LivrableUpdateEnum.OffTrack
        ? "red"
        : "yellow"
      : "green";

  console.log(color);

  return (
    <div className={`flex items-center gap-2 text-sm text-${color}-800`}>
      <div
        className={`w-5 h-5 rounded-full mt-1 flex items-center justify-center border border-${color}-600 bg-${color}-200`}
      >
        <LuActivity className="text-[11px]" />
      </div>
      <div className="font-medium">{updateStatusLabel[status]}</div>
    </div>
  );
};
