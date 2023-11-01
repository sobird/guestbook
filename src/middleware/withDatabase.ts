
const withDatabase = handler => {
  return async (req, res) => {
    // await client.connect();
    // req.db = client.db('somedb');
    return handler(req, res);
  };
}

export default withDatabase;