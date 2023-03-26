import axios from 'axios';
import { API } from './base/axios';
import { CreateVideoSchemaType, VideoSchemaType } from '../Schema/Video.Schema';
import { post } from './base';

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

export const createVideo = async (subject: CreateVideoSchemaType) => {
  const response = await post({
    url: `/videos`,
    body: subject,
  });
  return response as CreateVideoSchemaType;
};
