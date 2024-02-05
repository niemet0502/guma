import { gql, useQuery } from "@apollo/client";
import { NotificationApi } from "../type";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($user_id: Int!) {
    notifications(user_id: $user_id) {
      id
      reminder_id
      receiver_id
      created_at
      read
      content

      reminder {
        id
        title
      }
    }
  }
`;

export const useNotifications = (userId: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ notifications: NotificationApi[] }>(GET_NOTIFICATIONS, {
    variables: { user_id: +userId },
  });
  return { data: data?.notifications, isLoading, error };
};
