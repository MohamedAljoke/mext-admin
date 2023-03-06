import axios from 'axios';
import { API } from './base/axios';
import { VideoSchemaType } from '../Schema/Video.Schema';

export const fetchVideosList = async ({
  token,
}: {
  token?: string;
}): Promise<VideoSchemaType[]> => {
  const response = await axios.get(`${API}/videos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as VideoSchemaType[];
};
