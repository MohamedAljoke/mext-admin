import axios from 'axios';
import { API } from './base/axios';
import {
  ChapterSchemaType,
  CreateChapterSchemaType,
} from '../Schema/Chapter.Schema';
import { deleteRequest, post } from './base';
import put from './base/put';

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
export const createChapter = async (chapter: CreateChapterSchemaType) => {
  const response = await post({
    url: `/chapters`,
    body: chapter,
  });
  return response as CreateChapterSchemaType;
};

export const updateChapter = async ({
  chapter,
}: {
  chapter: ChapterSchemaType;
}): Promise<ChapterSchemaType> => {
  const response = await put({
    url: `/chapters/${chapter.id}`,
    body: { chapterName: chapter.chapter_name },
  });
  return response as ChapterSchemaType;
};

export const deleteChapter = async (chapterId: number) => {
  const response = await deleteRequest({
    url: `/chapters/${chapterId}`,
  });
  return response;
};
