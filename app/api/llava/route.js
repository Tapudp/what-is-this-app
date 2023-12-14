import LlavaController from '../../controllers/llava-controller';

export async function POST(request) {
  return await LlavaController.postVideoFrameToAnalyse(request);
}
