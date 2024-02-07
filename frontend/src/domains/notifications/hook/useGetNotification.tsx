import { gql, useQuery } from "@apollo/client";
import { NotificationApi } from "../type";

export const GET_NOTIFICATION_BY_ID = gql`
  query GetNotificationById($id: Int!) {
    notification(id: $id) {
      id
      reminder_id
      reminder {
        id
        title
        message
        task_id

        task {
          id
          name
          slug
        }

        author {
          id
          username
        }

        receivers {
          id
          user {
            id
            username
          }
        }
      }
      receiver_id
      created_at
      read
      content
    }
  }
`;

export const useGetNotification = (id: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ notification: NotificationApi }>(GET_NOTIFICATION_BY_ID, {
    variables: { id: +id },
  });
  return { data: data?.notification, isLoading, error };
};
