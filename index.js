import express from 'express';
const app = express();
import userRoutes from './modules/users/user.route.js';
import postRoutes from './modules/posts/post.route.js';

import { initConnection } from './DB/connection.js';

app.use(express.json());
initConnection();

app.use(userRoutes);
app.use(postRoutes);

app.get('/', (req, res) => res.send('Home Page'));

const port = 3000;
app.listen(port, () => console.log(`Server is working on port ${port}`));
