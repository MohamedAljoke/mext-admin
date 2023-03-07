import { QuestionSchemaType } from '@/App/Schema/Question.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Questions({
  questions,
}: {
  questions: QuestionSchemaType[];
}) {
  const questionsTableHeader = ['id', 'question_text'];
  return (
    <div>
      <Table tableHeader={questionsTableHeader} tableContent={questions} />
    </div>
  );
}
