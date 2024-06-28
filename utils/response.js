
export const response = (
  res,
  statusCode,
  message,
  output,
  status
) => {
  

  if (statusCode.toString().startsWith('4')) {
    status = 'fail';
  } else if (statusCode.toString().startsWith('5')) {
    status = 'error';
  } else if (
    statusCode === 200 ||
    statusCode === 201 ||
    statusCode === 202 ||
    statusCode === 204
  ) {
    status = 'success';
  } else {
    status = 'unknown';
  }

  const response = {
    status,
    statusCode,
    message,
    output,
  };

  return res.status(statusCode).json(response);
};

const error = (res, code, err) => {
  const message = err.message || err;
  return res.status(code).json({
    success: 0,
    message,
  });
};

const success = (res, code, data) =>
  res.status(code).send({
    success: 1,
    message: 'Successful',
    data,
  });

export { error, success };
