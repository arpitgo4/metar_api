
import app from '../app';

import { redisEventEmitter, } from '../utils/event-emitters';

const { SERVER_PORT, } = process.env;

function startServer() {

  redisEventEmitter.on('ready', () => {
    // returns http-server instance
    return app.listen(SERVER_PORT, function(err) {
      if (err) {
        return console.error(err);
      }

        console.log('Listening at http://localhost:' + SERVER_PORT);
    });
  });

};

export default startServer();