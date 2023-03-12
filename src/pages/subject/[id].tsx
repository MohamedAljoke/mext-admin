import Chapters from '@/App/Pages/Chapters/Chapters';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { fetchSubjectChapters } from '@/App/Services/Chapters';
import CustomButton from '@/App/Shared/common/Button/Button';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

interface PageProps {
  chapters?: ChapterSchemaType[];
  subjectId?: string;
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
    return { props: { chapters: chaptersList, subjectId: id as string } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function SubjectPage({
  chapters,
  subjectId,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <PrivateRoute>
      <>
        <div className="flex items-center">
          <CustomButton
            color="bg-[#6EB5D6]"
            onClick={() => {
              router.back();
            }}
            isSubmit={false}
          >
            <MdArrowBackIos />
            back
          </CustomButton>
          <h1 className="ml-8 text-2xl text-center font-semibold text-gray-900">
            Subject chapters
          </h1>
        </div>
        <Chapters chapters={chapters!} subjectId={subjectId!} />
      </>
    </PrivateRoute>
  );
}
