import { getToken } from '@/App/Utils/tokens';
import { NextApiRequest } from 'next';

interface WithTokenRequest {
  headers: {
    [key: string]: string | string[];
  };
  url: string;
}

export function withToken(
  handler: (
    context: WithTokenRequest | NextApiRequest
  ) => Promise<{ props: { data: string } }>
) {
  return async (req: WithTokenRequest, res: any) => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(req.url, { headers });
    const data = await response.json();
    await handler({ ...req, headers });
  };
}
