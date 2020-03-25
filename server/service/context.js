const service = require('./index');

module.exports = async ({ req }) => {
    const hash = req.headers.authorization || '';

    const user = await service.getUserByHash(hash);
    const auth = user ? true : false;

    return { auth, user };
};