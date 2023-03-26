import axios from 'axios';
import { API } from './base/axios';
import {
  CreateLectuerSchemaType,
  LectuerSchemaType,
} from '../Schema/Lectuer.Schema';
import { deleteRequest, post } from './base';
import put from './base/put';

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

export const createLectuer = async (lectuer: CreateLectuerSchemaType) => {
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
  const response = await axios.get(`${API}/lectuers/by-chapter/${chapterId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as LectuerSchemaType[];
};

export const deleteLecture = async (lectureId: number) => {
  const response = await deleteRequest({
    url: `/lectuers/${lectureId}`,
  });
  return response;
};

export const updateLecture = async ({
  lecture,
}: {
  lecture: LectuerSchemaType;
}): Promise<LectuerSchemaType> => {
  const response = await put({
    url: `/lectuers/${lecture.id}`,
    body: { lectureName: lecture.lecture_name },
  });
  return response as LectuerSchemaType;
};
export const fetchLectureContent = async ({
  token,
  lectureId,
}: {
  token?: string;
  lectureId: string;
}): Promise<LectuerSchemaType> => {
  const response = await axios.get(`${API}/lectuers/${lectureId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as LectuerSchemaType;
};
