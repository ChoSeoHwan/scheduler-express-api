import SchedulerApp from '~/app';

const app = new SchedulerApp();

// 서버 시작
app.start(8001, () => {
    console.log('start');
});
