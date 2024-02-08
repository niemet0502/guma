import { Avatar } from "@/components/ui/avatar";
import { getTimeAgoString } from "@/lib/utils";
import { client } from "@/main";
import { gql } from "@apollo/client";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetNotification } from "./hook/useGetNotification";

export const NotificationDetails: React.FC = () => {
  const { notificationId, orgaId } = useParams<{
    notificationId: string;
    orgaId: string;
  }>();

  const { data: notification } = useGetNotification(+notificationId!);

  useEffect(() => {
    client.cache.writeFragment({
      id: `Notification:${notificationId}`,
      fragment: gql`
        fragment MyNotification on Notification {
          read
        }
      `,
      data: {
        read: true,
      },
    });
  }, [notificationId, client, gql]);

  return (
    <div className="w-full">
      {notification && (
        <div className="">
          <div className="px-4 mt-5 flex flex-col gap-4 pb-5 border-b">
            <h1 className="text-2xl font-medium">
              {notification?.reminder?.title}
            </h1>
            <div className="flex gap-2">
              <p>
                Reminder created by{" "}
                <span className="font-medium">
                  {" "}
                  {notification.reminder?.author?.username}{" "}
                </span>
              </p>
              <div className="flex gap-2">
                Sent to{" "}
                <div className="flex gap-1">
                  {notification.reminder?.receivers?.map(({ user }) => (
                    <Avatar className="h-6 w-6 bg-transparent flex rounded-full border-2 items-center  justify-center mt-0.5">
                      <span className="text-muted-foreground  text-[9px]">
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </span>
                    </Avatar>
                  ))}
                </div>
                <span className="font-medium">
                  {" "}
                  {getTimeAgoString(notification.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p>
              {"Vous avez demandé qu'on vous rappelle cette tache"}{" "}
              <NavLink
                to={`/${orgaId}/team/${notification.reminder?.task?.team?.name.toLowerCase()}/issues/${
                  notification.reminder?.task?.slug
                }`}
                className="font-medium"
              >
                {notification.reminder?.task?.name}
              </NavLink>
              . <br />
              {notification.reminder?.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
