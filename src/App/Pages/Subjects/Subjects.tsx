import {
  EditSubjectSchema,
  EditSubjectSchemaType,
  SubjectSchema,
  SubjectSchemaType,
} from '@/App/Schema/Subject.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useEffect, useState } from 'react';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import { SubmitHandler } from 'react-hook-form';
import { deleteSubject, updateSubject } from '@/App/Services/Subjects';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { popError } from '@/App/components/PopUp/popError';
import Link from 'next/link';
import CustomButton from '@/App/Shared/common/Button/Button';

export default function Subjects({
  subjects,
}: {
  subjects: SubjectSchemaType[];
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [subjectList, setSubjectList] = useState<SubjectSchemaType[]>();
  const [choosenSubject, setChoosenSubject] = useState<SubjectSchemaType>();
  const [updatedSubject, setUpdatedSubject] = useState<SubjectSchemaType>();
  const subjectTableHeader: (keyof SubjectSchemaType)[] = [
    'id',
    'subject_name',
    'created_at',
    'updated_at',
  ];
  useEffect(() => {
    if (updatedSubject && subjects) {
      const updatedSubjects = subjectList?.map((subject) => {
        if (subject.id === updatedSubject.id) {
          return updatedSubject;
        } else {
          return subject;
        }
      });
      setSubjectList(updatedSubjects);
    } else {
      setSubjectList(subjects);
    }
  }, [subjects, updatedSubject]);
  //modals
  const openEditModal = (subject: SubjectSchemaType) => {
    setChoosenSubject(subject);
    setOpenEdit(true);
  };
  const deleteItem = async (item: SubjectSchemaType) => {
    try {
      await deleteSubject(item.id);
      popSucess('Item deleted');
      const newSubjectList = subjectList?.filter(
        (subject) => subject.id !== item.id
      );
      setSubjectList(newSubjectList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };

  const openDeleteModal = (subject: SubjectSchemaType) => {
    setChoosenSubject(subject);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditSubjectSchemaType> = async (data) => {
    if (!choosenSubject) {
      throw Error('no subject');
    }
    try {
      const response = await updateSubject({
        subject: { ...choosenSubject, ...data },
      });
      setUpdatedSubject({
        ...choosenSubject,
        subject_name: response.subject_name,
      });
      popSucess('Subject Updated');

      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <>
          <h1 className="text-2xl font-semibold text-gray-900">Subjects</h1>
          <Link href="/subjects/create">
            <CustomButton isSubmit={false}>Add subject</CustomButton>
          </Link>
        </>
      </div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditSubjectSchemaType, typeof EditSubjectSchema>
          items={[
            {
              name: 'subject_name',
              placeholder: 'Subject',
              label: 'Subject',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenSubject}
          closeModal={closeEditModal}
          itemSchema={EditSubjectSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<SubjectSchemaType>
          deleteItem={deleteItem}
          element={choosenSubject!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      {subjectList ? (
        <Table<SubjectSchemaType>
          hasDetails={true}
          detailsLink={'/subject/'}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={subjectTableHeader}
          tableContent={subjectList}
        />
      ) : (
        <h2>No Subjects</h2>
      )}
    </div>
  );
}
