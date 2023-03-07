import axios from 'axios';
import { API } from './base/axios';
import { PdfSchemaType } from '../Schema/Pdf.Schema';

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
