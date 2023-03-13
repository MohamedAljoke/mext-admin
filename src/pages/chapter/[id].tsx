import Chapters from '@/App/Pages/Chapters/Chapters';
import Lectuers from '@/App/Pages/Lectuers/Lectuers';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import { fetchSubjectChapters } from '@/App/Services/Chapters';
import { fetchChapterLectuers } from '@/App/Services/Lectuers';
import CustomButton from '@/App/Shared/common/Button/Button';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

interface PageProps {
  lectuers?: LectuerSchemaType[];
  chapterId?: string;
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
    const lectuerList: LectuerSchemaType[] = await fetchChapterLectuers({
      token: authToken,
      chapterId: id as string,
    });
    return { props: { lectuers: lectuerList, chapterId: id as string } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function ChapterPage({
  lectuers,
  chapterId,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <PrivateRoute>
      <>
        <div className="flex items-center">
          <CustomButton
            customCss="flex items-center"
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
            Chapter lectuers
          </h1>
        </div>
        {lectuers && <Lectuers lectuers={lectuers!} chapterId={chapterId} />}
      </>
    </PrivateRoute>
  );
}
