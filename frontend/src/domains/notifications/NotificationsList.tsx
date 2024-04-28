import { GoInbox } from "react-icons/go";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/providers/auth";
import { NotificationItem } from "./components/NotificationItem";
import { useNotifications } from "./hook/useNotifications";

export const NotificationsList: React.FC = () => {
  const { user } = useAuth();
  const { data: notifications } = useNotifications(+user!.id);
  return (
    <div className="w-full h-full flex">
      <div className="w-1/3 border-r">
        {notifications?.map((notification) => (
          <NotificationItem notification={notification} key={notification.id} />
        ))}
      </div>
      <div className="w-2/3">
        <Outlet />

        {notifications && notifications.length === 0 && (
          <div className="h-full flex flex-col gap-2 items-center justify-center">
            <GoInbox className="text-6xl" />
            <span>Inbox</span>

            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};
