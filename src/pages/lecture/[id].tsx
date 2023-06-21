import Chapters from '@/App/Pages/Chapters/Chapters';
import Lectuers from '@/App/Pages/Lectuers/Lectuers';
import Pdfs from '@/App/Pages/Pdfs/Pdfs';
import Questions from '@/App/Pages/Questions/Questions';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import { fetchSubjectChapters } from '@/App/Services/Chapters';
import { fetchLectureContent } from '@/App/Services/Lectuers';
import CustomButton from '@/App/Shared/common/Button/Button';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

interface PageProps {
  lecture?: LectuerSchemaType;
  lectureId?: string;
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
    const lecture: LectuerSchemaType = await fetchLectureContent({
      token: authToken,
      lectureId: id as string,
    });
    return { props: { lecture: lecture, lectureId: id as string } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function LecturePage({
  lecture,
  lectureId,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <PrivateRoute>
      <>
        <div className="flex items-center mb-5">
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
            Lecture elements
          </h1>
        </div>
        <div className="mt-16">
          <Pdfs pdfs={lecture?.pdfs} lectureId={lectureId} />
        </div>
        <div className="mt-32">
          <Questions questions={lecture?.questions} canCreate={true} lectureId={lectureId} />
        </div>

      </>
    </PrivateRoute>
  );
}
