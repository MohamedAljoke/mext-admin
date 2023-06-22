import axios from 'axios';
import { API } from './base/axios';
import {
  CreatePdfSchemaType,
  EditPdfSchemaSubmitType,
  PdfSchemaType,
} from '../Schema/Pdf.Schema';
import { deleteRequest, post } from './base';
import put from './base/put';
import { EditVideoSchemaSubmitType } from '../Schema/Video.Schema';

export const fetchPdfsList = async ({
  token,
}: {
  token?: string;
}): Promise<PdfSchemaType[]> => {
  const response = await axios.get(`${API}/pdfs`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as PdfSchemaType[];
};

export const createPdf = async (pdf: CreatePdfSchemaType) => {
  const response = await post({
    url: `/pdfs`,
    body: pdf,
  });
  return response as CreatePdfSchemaType;
};

export const updatePdf = async ({
  pdf,
}: {
  pdf: EditPdfSchemaSubmitType;
}): Promise<EditPdfSchemaSubmitType> => {
  const response = await put({
    url: `/pdfs/${pdf.id}`,
    body: {
      pdfName: pdf.pdf_name,
      pdfUrl: pdf.pdf_url,
      ...(pdf.typesId ? { typesId: pdf.typesId } : { typesId: [] }),
    },
  });
  return response as EditPdfSchemaSubmitType;
};

export const deletePdf = async (pdfId: number) => {
  const response = await deleteRequest({
    url: `/pdfs/${pdfId}`,
  });
  return response;
};
