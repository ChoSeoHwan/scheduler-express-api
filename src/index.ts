import '~/config/dotenvConfig';

import SchedulerApp from '~/app';

const app = new SchedulerApp().getApp();

// 서버 시작
app.listen(8001, () => {
    console.log('test');
});
