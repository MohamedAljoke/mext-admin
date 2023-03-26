import axios from 'axios';
import { API } from './base/axios';
import { CreateVideoSchemaType, VideoSchemaType } from '../Schema/Video.Schema';
import { deleteRequest, post } from './base';
import put from './base/put';

export const fetchVideosList = async ({
  token,
}: {
  token?: string;
}): Promise<VideoSchemaType[]> => {
  const response = await axios.get(`${API}/videos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data as VideoSchemaType[];
};

export const createVideo = async (subject: CreateVideoSchemaType) => {
  const response = await post({
    url: `/videos`,
    body: subject,
  });
  return response as CreateVideoSchemaType;
};

export const updateVideo = async ({
  video,
}: {
  video: VideoSchemaType;
}): Promise<VideoSchemaType> => {
  const response = await put({
    url: `/videos/${video.id}`,
    body: { videoName: video.video_name, videoUrl: video.video_url },
  });
  return response as VideoSchemaType;
};

export const deleteVideo = async (videoId: number) => {
  const response = await deleteRequest({
    url: `/videos/${videoId}`,
  });
  return response;
};
