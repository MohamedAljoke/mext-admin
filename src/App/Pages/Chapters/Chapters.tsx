import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useState } from 'react';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';

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
  return (
    <div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <>oi</>
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
