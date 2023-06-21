import { QuestionSchemaType } from '@/App/Schema/Question.Schema';
import { deleteQuestion } from '@/App/Services/Questions';
import CustomButton from '@/App/Shared/common/Button/Button';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import CustomModal from '@/App/components/Modal/Modal';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
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
  const [openDelete, setOpenDelete] = useState(false);
  const [choosenQuestion, setChoosenQuestion] = useState<QuestionSchemaType>();
  const [questionsList, setQuestionsList] = useState<QuestionSchemaType[]>();
  const questionsTableHeader: (keyof QuestionSchemaType)[] = [
    'id',
    'question_text',
  ];
  //modals
  const openDeleteModal = (subject: QuestionSchemaType) => {
    setChoosenQuestion(subject);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const openEditModal = (question: QuestionSchemaType) => {
    setChoosenQuestion(question);
    setOpenEdit(true);
  };
  const deleteItem = async (item: QuestionSchemaType) => {
    try {
      await deleteQuestion(item.id);
      popSucess('Question deleted');
      const newPdfList = questionsList?.filter((question) => question.id !== item.id);
      setQuestionsList(newPdfList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };
  return (
    <div>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<QuestionSchemaType>
          deleteItem={deleteItem}
          element={choosenQuestion!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
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
        openDeleteModal={openDeleteModal}
        tableHeader={questionsTableHeader}
        tableContent={questions}
        openEditModal={openEditModal}
      />
    </div>
  );
}
