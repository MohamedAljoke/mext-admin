import axios from 'axios';
import { API } from './base/axios';
import {
  CreateLectuerSchemaType,
  LectuerSchemaType,
} from '../Schema/Lectuer.Schema';
import { post } from './base';

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

export const createSubject = async (lectuer: CreateLectuerSchemaType) => {
  const response = await post({
    url: `/lectuers`,
    body: lectuer,
  });
  return response as CreateLectuerSchemaType;
};

export const fetchChapterLectuers = async ({
  token,
  chapterId,
}: {
  token?: string;
  chapterId: string;
}): Promise<LectuerSchemaType[]> => {
  console.log(chapterId);
  const response = await axios.get(`${API}/lectuers/by-chapter/${chapterId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(response);
  return response.data as LectuerSchemaType[];
};
