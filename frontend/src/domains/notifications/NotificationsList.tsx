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
      <div className="w-2/3 border"></div>
    </div>
  );
};
