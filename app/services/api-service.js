async function sayHi(request) {
  return {
    message: 'knock knock from server, it says hi',
    status: 'success',
  };
}

const APIService = {
  sayHi,
};

export default APIService;
