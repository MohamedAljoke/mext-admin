import {
  EditPdfSchema,
  EditPdfSchemaType,
  PdfSchemaType,
} from '@/App/Schema/Pdf.Schema';
import { TypeSchemaType } from '@/App/Schema/Types.schema';
import { deletePdf, updatePdf } from '@/App/Services/Pdfs';
import CustomButton from '@/App/Shared/common/Button/Button';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import CustomModal from '@/App/components/Modal/Modal';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import CustomSelect, { SelectOption } from '@/App/components/Select';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function Pdfs({ pdfs, lectureId, types }: { pdfs: PdfSchemaType[] | undefined, lectureId?: string, types?: TypeSchemaType[]; }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [choosenPdf, setChoosenPdf] = useState<PdfSchemaType>();
  const [openDelete, setOpenDelete] = useState(false);
  const [pdfList, setPdfList] = useState<PdfSchemaType[]>();
  const [updatedPdf, setUpdatedPdf] = useState<PdfSchemaType>();
  const [typesOptions, setTypesOptions] = useState<SelectOption[]>([])
  const [typesListSelected, setTypesListSelected] = useState<SelectOption[]>([])

  useEffect(() => {
    if (choosenPdf?.types?.length) {
      const typesFormatted = choosenPdf?.types?.map(type => {
        return {
          label: type.type_name,
          value: type.id
        }
      })
      setTypesListSelected(typesFormatted)
    } else {
      setTypesListSelected([])
    }
  }, [choosenPdf])
  useEffect(() => {
    if (types?.length) {
      const typesFormatted = types?.map(type => {
        return {
          label: type.type_name,
          value: type.id
        }
      })
      setTypesOptions(typesFormatted)
    }
  }, [types])
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
      const typesIds = typesListSelected.map(type => {
        return type.value as number
      })
      const response = await updatePdf({
        pdf: { ...choosenPdf, ...data, typesId: typesIds },
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
          <Link href={`/pdfs/create/${lectureId ? lectureId : ''}`}>
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
          children={<div className='mt-3'>
            <CustomSelect isMulti={true} options={typesOptions}
              values={typesListSelected}
              handleChange={(newValue) => {
                setTypesListSelected(prev => {
                  return [
                    ...newValue
                  ]
                })
              }}
            />
          </div>}
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
