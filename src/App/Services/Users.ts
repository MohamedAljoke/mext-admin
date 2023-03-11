import axios from 'axios';
import { API } from './base/axios';
import { UserSchemaType } from '../Schema/Users.Schema';
import { post } from './base';
import put from './base/put';

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
export const updateUser = async ({
  user,
}: {
  user: UserSchemaType;
}): Promise<UserSchemaType> => {
  const response = await put({
    url: `/users/${user.id}`,
    body: { userName: user.name, userEmail: user.email },
  });
  return response as UserSchemaType;
};
