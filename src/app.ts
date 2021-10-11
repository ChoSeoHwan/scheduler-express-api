import { delay } from '@choseohwan/utils';
import express from 'express';

const app = express();

app.get('/', async (req: express.Request, res: express.Response) => {
    console.log('delay start');
    await delay(1000);
    console.log('request received');
    res.send('start');
});

app.listen(8001, () => console.log('start'));
