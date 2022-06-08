const server = require('./api/server');

const port = process.env.PORT || 3000;
// @ts-ignore
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));