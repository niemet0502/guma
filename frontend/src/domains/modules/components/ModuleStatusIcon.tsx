import { FaCheck, FaPause } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { LivrableStatusEnum } from "../type";

export const ModuleStatusIcon: React.FC<{ status: LivrableStatusEnum }> = ({
  status,
}) => {
  let icon = null;

  switch (status) {
    case LivrableStatusEnum.InProgress:
      icon = (
        <div className="text-muted-foreground h-6 w-6 rounded-full flex items-center justify-center border-2 border-yellow-600 text-yellow-600">
          <GoDotFill />
        </div>
      );
      break;
    case LivrableStatusEnum.Completed:
      icon = (
        <div className="p-1 h-6 w-6 rounded-full flex items-center justify-center border-2 border-purple-600 text-purple-600">
          <FaCheck />
        </div>
      );
      break;
    case LivrableStatusEnum.Pause:
      icon = (
        <div className="p-1 h-6 w-6 rounded-full flex items-center justify-center  border-2">
          <FaPause className="fill-gray-300" />
        </div>
      );
      break;

    default:
      icon = (
        <div className="text-muted-foreground p-2 h-5 w-5 rounded-full flex items-center justify-center border-4"></div>
      );
      break;
  }

  return <div className="hover:cursor-pointer">{icon}</div>;
};
