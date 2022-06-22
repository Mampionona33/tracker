let message = '';

const setMessage = (_, { message }) => {
  message = message;
  console.log(message);
  return message;
};

const getMessage = () => {
  return message;
};

module.exports = { setMessage, getMessage };
