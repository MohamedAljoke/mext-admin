import Questions from '@/App/Pages/Questions/Questions';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { QuestionSchemaType } from '@/App/Schema/Question.Schema';
import { fetchChaptersList } from '@/App/Services/Chapters';
import { fetchQuestionsList } from '@/App/Services/Questions';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  questions?: QuestionSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const questionsList: QuestionSchemaType[] = await fetchQuestionsList({
      token: authToken,
    });
    return { props: { questions: questionsList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function QuestionsPage({
  questions,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <>
        {questions && questions?.length > 0 ? (
          <Questions questions={questions} />
        ) : null}
      </>
    </PrivateRoute>
  );
}
