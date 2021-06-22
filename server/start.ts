process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@server/app';
import TodoRoutes from '@server/routes/todo.route';

const app = new App([new TodoRoutes()]);

app.listen();
