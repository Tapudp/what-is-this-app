import { NextResponse } from 'next/server';
import LlavaService from '../services/llava-service';
import logger from '../utils/logger';

async function postVideoFrameToAnalyse(request) {
  try {
    const response = await LlavaService.postVideoFrame(request);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    logger.error(':: postVideoFrameToAnalyse : controller :: ', error.message);
    return NextResponse.json({ message: error.message, stack: error.stack }, { status: 500 });
  }
}

const LlavaController = {
  postVideoFrameToAnalyse,
};

export default LlavaController;
