import {
  ChapterSchemaType,
  EditChapterSchema,
  EditChapterSchemaType,
} from '@/App/Schema/Chapter.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useEffect, useState } from 'react';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import { SubmitHandler } from 'react-hook-form';
import { deleteChapter, updateChapter } from '@/App/Services/Chapters';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { popError } from '@/App/components/PopUp/popError';
import Link from 'next/link';
import CustomButton from '@/App/Shared/common/Button/Button';

export default function Chapters({
  chapters,
  subjectId,
}: {
  chapters: ChapterSchemaType[] | undefined;
  subjectId?: string;
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
  useEffect(() => {
    if (updatedChapter && chapters) {
      const updatedChapters = chapterList?.map((chapter) => {
        if (chapter.id === updatedChapter.id) {
          return updatedChapter;
        } else {
          return chapter;
        }
      });
      setChapterList(updatedChapters);
    } else {
      setChapterList(chapters);
    }
  }, [chapters, updatedChapter]);
  const openEditModal = (chapter: ChapterSchemaType) => {
    setChoosenChapter(chapter);
    setOpenEdit(true);
  };
  const deleteItem = async (item: ChapterSchemaType) => {
    try {
      await deleteChapter(item.id);
      popSucess('Item deleted');
      const newSubjectList = chapterList?.filter(
        (chapter) => chapter.id !== item.id
      );
      setChapterList(newSubjectList);
    } catch (e) {
      popError('error deleting item');
    }
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
      {subjectId && (
        <div className="flex justify-between mt-8">
          <>
            <h1 className="text-2xl font-semibold text-gray-900">Chapters</h1>
            <Link href={`/chapters/create/${subjectId}`}>
              <CustomButton isSubmit={false}>Add chapter</CustomButton>
            </Link>
          </>
        </div>
      )}
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
      {chapterList ? (
        <Table<ChapterSchemaType>
          hasDetails={true}
          detailsLink={'/chapter/'}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={lectuerTableHeader}
          tableContent={chapterList!}
        />
      ) : (
        <h2>No Chapters</h2>
      )}
    </div>
  );
}
