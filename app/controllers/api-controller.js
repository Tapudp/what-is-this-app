import { NextResponse } from 'next/server';
import APIService from '../services/api-service';

async function sayHi(_) {
  try {
    const response = await APIService.sayHi();
    return NextResponse.json({ ...response }, { status: 200 });
  } catch (error) {
    logger.error(':: api-service : controller :: ', error.message);
    return NextResponse.json(error, { status: 500 });
  }
}

const APIController = {
  sayHi,
};

export default APIController;
