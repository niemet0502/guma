import { LuActivity } from "react-icons/lu";
import { LivrableUpdateEnum } from "../type";

const updateStatusLabel = ["On track", "At risk", "Off track"];

export const ModuleUpdateIcon: React.FC<{
  status: number;
  showStatusLabel?: boolean;
}> = ({ status, showStatusLabel = true }) => {
  const color =
    status != LivrableUpdateEnum.OnTrack
      ? status === LivrableUpdateEnum.OffTrack
        ? "off-track-status"
        : "t-risk-status"
      : "on-track-status";

  return (
    <div className={`flex items-center gap-2 text-sm ${color}`}>
      <div
        className={`w-5 h-5 rounded-full mt-1 flex items-center justify-center border`}
      >
        <LuActivity className="text-[11px]" />
      </div>
      {showStatusLabel && (
        <div className={`font-medium text-${color}-800`}>
          {updateStatusLabel[status]}
        </div>
      )}
    </div>
  );
};
