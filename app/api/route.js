import APIController from '../controllers/api-controller';

export async function GET(request) {
  return APIController.sayHi(request);
}
