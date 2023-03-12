import axios from 'axios';
import { API } from './base/axios';
import {
  CreateSubjectSchemaType,
  SubjectSchemaType,
} from '../Schema/Subject.Schema';
import put from './base/put';
import { deleteRequest, post } from './base';

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
export const updateSubject = async ({
  subject,
}: {
  subject: SubjectSchemaType;
}): Promise<SubjectSchemaType> => {
  const response = await put({
    url: `/subjects/${subject.id}`,
    body: { subjectName: subject.subject_name },
  });
  return response as SubjectSchemaType;
};

export const deleteSubject = async (subjectId: number) => {
  const response = await deleteRequest({
    url: `/subjects/${subjectId}`,
  });
};
export const createSubject = async (subject: CreateSubjectSchemaType) => {
  const response = await post({
    url: `/subjects`,
    body: subject,
  });
  return response as SubjectSchemaType;
};
