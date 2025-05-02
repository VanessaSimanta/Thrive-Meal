const { env, port } = require('./src/core/config');
const server = require('./src/core/server');

const app = server.listen(port, (err) => {
  if (err) {
    console.error('Failed to start the server:', err);
    process.exit(1);
  } else {
    console.log(`Server runs at port ${port} in ${env} environment`);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);

  // Shutdown the server gracefully
  app.close(() => process.exit(1));

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => process.abort(), 1000).unref();
});
