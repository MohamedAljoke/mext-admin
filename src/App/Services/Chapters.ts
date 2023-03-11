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
export const fetchSubjectChapters = async ({
  token,
  subjectId,
}: {
  token?: string;
  subjectId: string;
}): Promise<ChapterSchemaType[]> => {
  const response = await axios.get(`${API}/chapters/by-subject/${subjectId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as ChapterSchemaType[];
};
