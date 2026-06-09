import { Anthropic } from '@anthropic-ai/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  review?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code content is required' });
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

    const client = new Anthropic({
      apiKey: apiKey,
    });

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Please review the following code and provide constructive feedback on quality, performance, security, and best practices:\n\n\`\`\`\n${code}\n\`\`\``,
        },
      ],
    });

    const review =
      message.content[0].type === 'text' ? message.content[0].text : 'No review generated';

    return res.status(200).json({ review });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ error: 'Failed to generate code review' });
  }
}
