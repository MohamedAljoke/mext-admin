import { SubjectSchemaType } from '@/App/Schema/Subject.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useEffect, useState } from 'react';
import EditSubject from './EditSubject/EditSubject';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';

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
      const updatedSubjects = subjects.map((subject) => {
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
  const openEditModal = (subject: SubjectSchemaType) => {
    setChoosenSubject(subject);
    setOpenEdit(true);
  };
  const deleteItem = (item: SubjectSchemaType) => {
    console.log(item);
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
  return (
    <div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditSubject
          choosenSubject={choosenSubject}
          closeModal={closeEditModal}
          setUpdatedSubject={setUpdatedSubject}
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
          detailsLink={'/subject/12'}
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
