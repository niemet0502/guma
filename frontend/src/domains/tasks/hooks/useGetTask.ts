import { gql, useQuery } from "@apollo/client";
import { TaskApi } from "../type";

const GET_TASK_BY_SLUG_AND_TEAM = gql`
  query GetTaskBySlugAndTeam($slug: String!) {
    taskBySlug(slug: $slug) {
      id
      slug
      name
      identifier
      description
      priority
      created_at
      created_by
      author {
        id
        username
      }
      assignee_to
      assignee {
        id
        username
      }
      parent_task_id
      sprint_id
      status_id
      status {
        id
        name
        team_id
      }
      team_id

      team {
        id
        visibility
        members {
          id

          user {
            id
            username
          }
        }
      }
      subtasks {
        id
        name
        slug
        identifier
      }
      comments {
        id
        content
        author {
          id
          username
        }
      }
      activities {
        id
        author {
          id
          username
        }

        to {
          id
          name
        }

        from {
          id
          name
        }

        sprint {
          id
          name
        }

        action
        created_at
      }
      labels {
        id
        label {
          id
          name
        }
      }
    }
  }
`;

export const useGetTask = (slug: string) => {
  const { data, error } = useQuery<{ taskBySlug: TaskApi }>(
    GET_TASK_BY_SLUG_AND_TEAM,
    {
      variables: { slug },
    }
  );

  return { data: data?.taskBySlug, error };
};
