import axios from 'axios';
import { API } from './base/axios';
import { UserSchemaType } from '../Schema/Users.Schema';

export const fetchUsersList = async ({
  token,
}: {
  token?: string;
}): Promise<UserSchemaType[]> => {
  const response = await axios.get(`${API}/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as UserSchemaType[];
};
