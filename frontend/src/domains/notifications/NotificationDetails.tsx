import { useParams } from "react-router-dom";
import { useGetNotification } from "./hook/useGetNotification";

export const NotificationDetails: React.FC = () => {
  const { notificationId } = useParams<{ notificationId: string }>();

  const { data: notification } = useGetNotification(+notificationId!);
  return (
    <div className="w-full px-3 py-4">
      <h1>{notification?.reminder?.title}</h1>
    </div>
  );
};
