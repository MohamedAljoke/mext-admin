import { QuestionSchemaType } from '@/App/Schema/Question.Schema';
import CustomButton from '@/App/Shared/common/Button/Button';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Questions({
  questions,
  canCreate,
  lectureId
}: {
  questions: QuestionSchemaType[];
  canCreate?: boolean
  lectureId?: string
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [choosenQuestion, setChoosenQuestion] = useState<QuestionSchemaType>();
  const questionsTableHeader: (keyof QuestionSchemaType)[] = [
    'id',
    'question_text',
  ];
  //modals
  const openEditModal = (question: QuestionSchemaType) => {
    setChoosenQuestion(question);
    setOpenEdit(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Questions</h1>
        {
          canCreate ?
            <Link href={`/questions/create/${lectureId}`}>
              <CustomButton isSubmit={false}>Add question</CustomButton>
            </Link> : null
        }
      </div>
      <Table<QuestionSchemaType>
        tableHeader={questionsTableHeader}
        tableContent={questions}
        openEditModal={openEditModal}
      />
    </div>
  );
}
