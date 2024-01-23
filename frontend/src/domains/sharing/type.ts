import { User, UserProfileEnum } from "../auth/services/types";

export interface AnswerApi {
  id: number;
  content: string;
  question_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  votes: [Vote];
  author?: User;
}

export interface CreateAnswerInput {
  content: string;
  created_by?: number;
  question_id: number;
}

export interface CreateVoteInput {
  isvalidated: boolean;
  answer_id: number;
  created_by?: number;
}

export interface Vote {
  id: number;
  created_by: number;
  answer_id: number;
  isvalidated: boolean;
  author?: UserProfileEnum;
}

export interface QuestionApi {
  id: number;
  title: string;
  content: string;
  created_at: string;
  created_by: number;
  view: number;
  updated_at: string;
  answers: [AnswerApi];
  author?: User;
}

export interface CreateQuestionInput {
  title: string;
  content: string;
  created_by?: number;
}
