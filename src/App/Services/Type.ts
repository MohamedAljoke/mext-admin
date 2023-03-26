import axios from 'axios';
import { CreateTypeSchemaType, TypeSchemaType } from '../Schema/Types.schema';
import { API } from './base/axios';
import { deleteRequest, post } from './base';
import put from './base/put';

export const fetchTypesList = async ({
  token,
}: {
  token?: string;
}): Promise<TypeSchemaType[]> => {
  const response = await axios.get(`${API}/types`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as TypeSchemaType[];
};

export const createType = async (subject: CreateTypeSchemaType) => {
  const response = await post({
    url: `/types`,
    body: subject,
  });
  return response as CreateTypeSchemaType;
};

export const updateType = async ({
  type,
}: {
  type: TypeSchemaType;
}): Promise<TypeSchemaType> => {
  const response = await put({
    url: `/types/${type.id}`,
    body: { typeName: type.type_name },
  });
  return response as TypeSchemaType;
};

export const deleteType = async (typeId: number) => {
  const response = await deleteRequest({
    url: `/types/${typeId}`,
  });
  return response;
};
