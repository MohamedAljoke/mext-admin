import axios from 'axios';
import { API } from './base/axios';
import { ChapterSchemaType } from '../Schema/Chapter.Schema';

export const fetchChaptersList = async ({
  token,
}: {
  token?: string;
}): Promise<ChapterSchemaType[]> => {
  const response = await axios.get(`${API}/chapters`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as ChapterSchemaType[];
};
