import {
  EditChapterSchema,
  EditChapterSchemaType,
} from '@/App/Schema/Chapter.Schema';
import {
  EditLectuerSchema,
  EditLectuerSchemaType,
  LectuerSchema,
  LectuerSchemaType,
} from '@/App/Schema/Lectuer.Schema';
import { deleteLecture } from '@/App/Services/Lectuers';
import CustomButton from '@/App/Shared/common/Button/Button';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import CustomModal from '@/App/components/Modal/Modal';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function Lectuers({
  lectuers,
  chapterId,
}: {
  lectuers: LectuerSchemaType[];
  chapterId?: string;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [lectuerList, setLectuerList] = useState<LectuerSchemaType[]>();
  const [choosenLectuer, setChoosenLectuer] = useState<LectuerSchemaType>();
  const [updatedLectuer, setUpdatedLectuer] = useState<LectuerSchemaType>();
  useEffect(() => {
    if (updatedLectuer && lectuers) {
      const updatedLectuers = lectuerList?.map((lectuer) => {
        if (lectuer.id === updatedLectuer.id) {
          return updatedLectuer;
        } else {
          return lectuer;
        }
      });
      setLectuerList(updatedLectuers);
    } else {
      setLectuerList(lectuers);
    }
  }, [lectuers, updatedLectuer]);
  const openEditModal = (lectuer: LectuerSchemaType) => {
    setChoosenLectuer(lectuer);
    setOpenEdit(true);
  };
  const openDeleteModal = (lectuer: LectuerSchemaType) => {
    setChoosenLectuer(lectuer);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  const lectuerTableHeader: (keyof LectuerSchemaType)[] = [
    'id',
    'chapter_id',
    'video_id',
    'lecture_name',
    'created_at',
    'updated_at',
  ];
  const deleteItem = async (item: LectuerSchemaType) => {
    try {
      await deleteLecture(item.id);
      popSucess('Item deleted');
      const newLectureList = lectuerList?.filter(
        (lectuer) => lectuer.id !== item.id
      );
      setLectuerList(newLectureList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditLectuerSchemaType> = async (data) => {
    if (!choosenLectuer) {
      throw Error('no lectuer');
    }
    try {
      // const response = await updateChapter({
      //   chapter: { ...choosenChapter, ...data },
      // });
      // setUpdatedChapter({
      //   ...choosenChapter,
      //   chapter_name: response.chapter_name,
      // });
      popSucess('Chapter Updated');
      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  return (
    <div>
      {chapterId && (
        <div className="flex justify-between mt-8">
          <>
            <h1 className="text-2xl font-semibold text-gray-900">Lectuers</h1>
            <Link href={`/lectuers/create/${chapterId}`}>
              <CustomButton isSubmit={false}>Add lectuer</CustomButton>
            </Link>
          </>
        </div>
      )}
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditLectuerSchemaType, typeof EditLectuerSchema>
          items={[
            {
              name: 'chapter_name',
              placeholder: 'Chapter',
              label: 'Chapter',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenLectuer as any}
          closeModal={closeEditModal}
          itemSchema={EditChapterSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<LectuerSchemaType>
          deleteItem={deleteItem}
          element={choosenLectuer!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      {lectuerList ? (
        <Table
          hasDetails={true}
          detailsLink={'/lectuer/'}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={lectuerTableHeader}
          tableContent={lectuerList}
        />
      ) : (
        <h2>No Lectures</h2>
      )}
    </div>
  );
}
