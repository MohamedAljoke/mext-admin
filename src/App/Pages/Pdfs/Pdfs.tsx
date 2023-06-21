import {
  EditPdfSchema,
  EditPdfSchemaType,
  PdfSchemaType,
} from '@/App/Schema/Pdf.Schema';
import { deletePdf, updatePdf } from '@/App/Services/Pdfs';
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

export default function Pdfs({ pdfs }: { pdfs: PdfSchemaType[] | undefined }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [choosenPdf, setChoosenPdf] = useState<PdfSchemaType>();
  const [openDelete, setOpenDelete] = useState(false);
  const [pdfList, setPdfList] = useState<PdfSchemaType[]>();
  const [updatedPdf, setUpdatedPdf] = useState<PdfSchemaType>();

  useEffect(() => {
    if (updatedPdf && pdfs) {
      const updatedPdfs = pdfList?.map((pdf) => {
        if (pdf.id === updatedPdf.id) {
          return updatedPdf;
        } else {
          return pdf;
        }
      });
      setPdfList(updatedPdfs);
    } else {
      setPdfList(pdfs);
    }
  }, [pdfs, updatedPdf]);
  //modals
  const openEditModal = (pdf: PdfSchemaType) => {
    setChoosenPdf(pdf);
    setOpenEdit(true);
  };
  const deleteItem = async (item: PdfSchemaType) => {
    try {
      await deletePdf(item.id);
      popSucess('Item deleted');
      const newPdfList = pdfList?.filter((pdf) => pdf.id !== item.id);
      setPdfList(newPdfList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };

  const openDeleteModal = (subject: PdfSchemaType) => {
    setChoosenPdf(subject);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditPdfSchemaType> = async (data) => {
    if (!choosenPdf) {
      throw Error('no pdf');
    }
    try {
      const response = await updatePdf({
        pdf: { ...choosenPdf, ...data },
      });
      setUpdatedPdf({
        ...choosenPdf,
        pdf_name: response.pdf_name,
        pdf_url: response.pdf_url,
      });
      popSucess('Video Updated');

      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  const pdfsTableHeader: (keyof PdfSchemaType)[] = [
    'id',
    'pdf_name',
    'pdf_url',
  ];
  return (
    <div>
      <div className="flex justify-between">
        <>
          <h1 className="text-2xl font-semibold text-gray-900">Pdfs</h1>
          <Link href="/pdfs/create">
            <CustomButton isSubmit={false}>Add pdf</CustomButton>
          </Link>
        </>
      </div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditPdfSchemaType, typeof EditPdfSchema>
          items={[
            {
              name: 'pdf_name',
              placeholder: 'Pdf',
              label: 'Pdf',
            },
            {
              name: 'pdf_url',
              placeholder: 'url',
              label: 'pdf link',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenPdf}
          closeModal={closeEditModal}
          itemSchema={EditPdfSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<PdfSchemaType>
          deleteItem={deleteItem}
          element={choosenPdf!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      {pdfList ? (
        <Table<PdfSchemaType>
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={pdfsTableHeader}
          tableContent={pdfList}
        />
      ) : (
        <h2>No pdfs</h2>
      )}
    </div>
  );
}
