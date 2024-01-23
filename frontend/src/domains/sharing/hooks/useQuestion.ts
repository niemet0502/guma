import { gql, useQuery } from "@apollo/client";
import { QuestionApi } from "../type";

const GET_QUESTIONS = gql`
  query GetQuestion {
    questions {
      id
      title
      content
      created_at
      created_by
      view
      updated_at
      answers {
        id
      }
      author {
        id
        username
      }
    }
  }
`;

export const useQuestion = () => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ questions: QuestionApi[] }>(GET_QUESTIONS);

  return { data: data?.questions, isLoading, error };
};
