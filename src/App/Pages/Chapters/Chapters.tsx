import {
  ChapterSchemaType,
  EditChapterSchema,
  EditChapterSchemaType,
} from '@/App/Schema/Chapter.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useState } from 'react';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import { SubmitHandler } from 'react-hook-form';
import { updateChapter } from '@/App/Services/Chapters';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { popError } from '@/App/components/PopUp/popError';
import { EditSubjectSchema } from '@/App/Schema/Subject.Schema';

export default function Chapters({
  chapters,
}: {
  chapters: ChapterSchemaType[];
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [chapterList, setChapterList] = useState<ChapterSchemaType[]>();
  const [choosenChapter, setChoosenChapter] = useState<ChapterSchemaType>();
  const [updatedChapter, setUpdatedChapter] = useState<ChapterSchemaType>();
  const lectuerTableHeader: (keyof ChapterSchemaType)[] = [
    'id',
    'subject_id',
    'chapter_name',
    'created_at',
    'updated_at',
  ];
  const openEditModal = (chapter: ChapterSchemaType) => {
    setChoosenChapter(chapter);
    setOpenEdit(true);
  };
  const deleteItem = (item: ChapterSchemaType) => {
    setOpenDelete(false);
  };

  const openDeleteModal = (chapter: ChapterSchemaType) => {
    setChoosenChapter(chapter);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditChapterSchemaType> = async (data) => {
    if (!choosenChapter) {
      throw Error('no chapter');
    }
    try {
      const response = await updateChapter({
        chapter: { ...choosenChapter, ...data },
      });
      setUpdatedChapter({
        ...choosenChapter,
        chapter_name: response.chapter_name,
      });
      popSucess('Chapter Updated');
      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  return (
    <div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditChapterSchemaType, typeof EditChapterSchema>
          items={[
            {
              name: 'chapter_name',
              placeholder: 'Chapter',
              label: 'Chapter',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenChapter as any}
          closeModal={closeEditModal}
          itemSchema={EditChapterSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<ChapterSchemaType>
          deleteItem={deleteItem}
          element={choosenChapter!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      <Table<ChapterSchemaType>
        hasDetails={true}
        detailsLink={'/chapter/'}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
        tableHeader={lectuerTableHeader}
        tableContent={chapters}
      />
    </div>
  );
}
