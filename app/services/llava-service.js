import replicate from '../utils/replicate';
import logger from '../utils/logger';
import constants from '../constants/';

async function postVideoFrame(request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video');
    const question = formData.get('question');

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    const output = await replicate.run(process.env.LLAVA_MODEL_ID, {
      input: {
        video_path: videoFile.path,
        text_prompt: question || constants.data.MOCK_QUESTION,
      },
    });

    return output;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

const LlavaService = {
  postVideoFrame,
};

export default LlavaService;
