import axios from 'axios';
import { API } from './base/axios';
import {
  CreateQuestionSchemaSubmitType,
  QuestionSchemaType,
} from '../Schema/Question.Schema';
import { deleteRequest, post } from './base';

export const fetchQuestionsList = async ({
  token,
}: {
  token?: string;
}): Promise<QuestionSchemaType[]> => {
  const response = await axios.get(`${API}/questions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as QuestionSchemaType[];
};
export const createQuestion = async (
  question: CreateQuestionSchemaSubmitType
) => {
  const response = await post({
    url: `/questions`,
    body: question,
  });
  return response as CreateQuestionSchemaSubmitType;
};

export const deleteQuestion = async (questionId: number) => {
  const response = await deleteRequest({
    url: `/questions/${questionId}`,
  });
  return response;
};
