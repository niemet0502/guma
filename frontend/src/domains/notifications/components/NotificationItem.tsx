import { getTimeAgoString, truncateString } from "@/lib/utils";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { NotificationApi } from "../type";

export const NotificationItem: React.FC<{ notification: NotificationApi }> = ({
  notification,
}) => {
  const { orgaId } = useParams<{ orgaId: string }>();

  return (
    <NavLink
      to={`/${orgaId}/notifications/${notification.id}`}
      className={({ isActive, isPending }) =>
        isActive
          ? "activenotification"
          : isPending
          ? "defaultnotification"
          : "defaultnotification"
      }
    >
      <div
        className={`notification-item border-b flex flex-col w-full px-3 py-4 gap-2  hover:cursor-pointer border-l-[4px] border-l-transparent ${
          !notification.read ? "font-medium" : "text-gray-600"
        }`}
      >
        <div className="flex items-center gap-2">
          {!notification.read && (
            <div className="ml-1 h-2 w-2 rounded-full bg-violet-800"></div>
          )}
          <span className="text-sm overflow-hidder">
            {notification.reminder?.title}
          </span>
        </div>
        <div className="text-base flex gap-2 items-center">
          <IoIosNotifications className="text-lg" />
          <span className="flex-1 overflow-hidden">
            {truncateString(notification.content || "", 35)}
          </span>
          <span>{getTimeAgoString(notification.created_at)}</span>
        </div>
      </div>
    </NavLink>
  );
};
