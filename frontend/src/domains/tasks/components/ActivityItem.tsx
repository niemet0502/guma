import { Avatar } from "@/components/ui/avatar";
import { getTimeAgoString } from "@/lib/utils";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsDot, BsPen } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { Activity, ActivityAction } from "../type";

export const ActivityItem: React.FC<{ activity: Activity }> = ({
  activity,
}) => {
  let icon = null;

  switch (activity.action) {
    case ActivityAction.CREATE_ISSUE:
      icon = (
        <Avatar className="h-6 w-6 bg-transparent border-2 items-center justify-center mt-0.5">
          <span className="text-muted-foreground text-[9px]">
            {activity.author.username.slice(0, 2).toUpperCase()}
          </span>
        </Avatar>
      );
      break;

    case ActivityAction.CHANGED_STATUS:
      icon = (
        <div className="h-5 w-5 border-4 border-amber-600 rounded-full ml-0.5"></div>
      );
      break;

    case ActivityAction.CHANGED_TITLE:
    case ActivityAction.UPDATED_DESCRIPTION:
      icon = <BsPen className="ml-1 texte-muted-foreground" />;
      break;

    case ActivityAction.ADDED_LABEL:
      icon = <MdLabelOutline className="ml-1" />;
      break;

    case ActivityAction.ADDED_SPRINT:
      icon = <AiOutlinePlayCircle className="ml-1" />;
      break;

    default:
      break;
  }

  return (
    <div className="flex gap-2 text-sm items-center mt-4">
      <div className="w-7">{icon}</div>

      <span>{activity.author.username}</span>
      <span className="text-muted-foreground">{activity.action}</span>
      {activity.action === ActivityAction.CHANGED_STATUS && (
        <p className="flex gap-1">
          <span>{activity.from?.name}</span>
          <span className="text-muted-foreground">to</span>
          <span>{activity.to?.name}</span>
        </p>
      )}

      {activity.action === ActivityAction.ADDED_SPRINT && (
        <span>{activity.sprint?.name}</span>
      )}
      <span className="text-muted-foreground flex gap-1 items-center">
        <BsDot />
        {getTimeAgoString(activity.created_at)}
      </span>
    </div>
  );
};
