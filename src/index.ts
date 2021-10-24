import 'source-map-support/register';
import '~/config/dotenvConfig';

import SchedulerApp from '~/App';

const app = new SchedulerApp().getApp();

// 서버 시작
app.listen(8001, () => {
    console.log('test');
});
