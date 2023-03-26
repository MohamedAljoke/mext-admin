import axios from 'axios';
import { API } from './base/axios';
import { CreatePdfSchemaType, PdfSchemaType } from '../Schema/Pdf.Schema';
import { deleteRequest, post } from './base';
import put from './base/put';

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
  pdf: PdfSchemaType;
}): Promise<PdfSchemaType> => {
  const response = await put({
    url: `/pdfs/${pdf.id}`,
    body: { pdfName: pdf.pdf_name, pdfUrl: pdf.pdf_url },
  });
  return response as PdfSchemaType;
};

export const deletePdf = async (pdfId: number) => {
  const response = await deleteRequest({
    url: `/pdfs/${pdfId}`,
  });
  return response;
};
