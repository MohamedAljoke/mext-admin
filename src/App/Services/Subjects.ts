import axios from 'axios';
import { API } from './base/axios';
import { SubjectSchemaType } from '../Schema/Subject.Schema';

export const fetchSubjectsList = async ({
  token,
}: {
  token?: string;
}): Promise<SubjectSchemaType[]> => {
  const response = await axios.get(`${API}/subjects`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as SubjectSchemaType[];
};
