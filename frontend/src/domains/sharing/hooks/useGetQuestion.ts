import { gql, useQuery } from "@apollo/client";
import { QuestionApi } from "../type";

export const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($id: Int!) {
    question(id: $id) {
      id
      title
      content
      created_at
      created_by
      view
      updated_at
      answers {
        id
        content
        question_id
        created_at
        created_by
        updated_at
        votes {
          id
          created_by
          answer_id
          isvalidated
          author {
            id
            username
          }
        }
        author {
          id
          username
        }
      }
      author {
        id
        username
      }
    }
  }
`;

export const useGetQuestion = (questionId: string) => {
  const { data, error } = useQuery<{ question: QuestionApi }>(
    GET_QUESTION_BY_ID,
    {
      variables: { id: +questionId },
    }
  );

  return { data: data?.question, error };
};
