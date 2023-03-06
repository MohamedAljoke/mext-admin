import axios from 'axios';
import { API } from './base/axios';
import { LectuerSchemaType } from '../Schema/Lectuer.Schema';

export const fetchLectuersList = async ({
  token,
}: {
  token?: string;
}): Promise<LectuerSchemaType[]> => {
  const response = await axios.get(`${API}/lectuers`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as LectuerSchemaType[];
};
