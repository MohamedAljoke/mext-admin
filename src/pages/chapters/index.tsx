import Chapters from '@/App/Pages/Chapters/Chapters';
import Lectuers from '@/App/Pages/Lectuers/Lectuers';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import { fetchChaptersList } from '@/App/Services/Chapters';
import { fetchLectuersList } from '@/App/Services/Lectuers';
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
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const chaptersList: ChapterSchemaType[] = await fetchChaptersList({
      token: authToken,
    });
    return { props: { chapters: chaptersList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function ChaptersPage({
  chapters,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <>
        {chapters && chapters?.length > 0 ? (
          <Chapters chapters={chapters} />
        ) : null}
      </>
    </PrivateRoute>
  );
}
