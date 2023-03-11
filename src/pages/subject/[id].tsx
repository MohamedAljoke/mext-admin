import Chapters from '@/App/Pages/Chapters/Chapters';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import {
  fetchChaptersList,
  fetchSubjectChapters,
} from '@/App/Services/Chapters';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  chapters?: ChapterSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { id } = context.query;
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const chaptersList: ChapterSchemaType[] = await fetchSubjectChapters({
      token: authToken,
      subjectId: id as string,
    });
    return { props: { chapters: chaptersList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function SubjectPage({
  chapters,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(chapters);
  return (
    <PrivateRoute>
      <>
        {chapters && chapters?.length > 0 ? (
          <Chapters chapters={chapters} />
        ) : (
          <h2 className="flex items-center text-center">
            No Chapter where found
          </h2>
        )}
      </>
    </PrivateRoute>
  );
}
