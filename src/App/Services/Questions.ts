import axios from 'axios';
import { API } from './base/axios';
import { QuestionSchemaType } from '../Schema/Question.Schema';

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
