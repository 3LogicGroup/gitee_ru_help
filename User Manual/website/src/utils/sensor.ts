import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';


// 神策统计
const sensor = (function () {
  let sensorsDataSDK = null;
  if (ExecutionEnvironment.canUseDOM) {
    sensorsDataSDK = require('sa-sdk-javascript');
  }
  return {
    init: (SENSOR_SERVER_URL: string) => {
      const isAllowStart = sensorsDataSDK && SENSOR_SERVER_URL
      if (isAllowStart) {
        sensorsDataSDK.init({
          name: 'sensors',
          show_log: false,
          server_url: SENSOR_SERVER_URL,
          is_track_single_page: true,
          use_client_time: true,
          send_type: 'beacon',
          heatmap: {
            //default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
            clickmap: 'default',
            //default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭。
            scroll_notice_map: 'not_collect',
          },
        });
        sensorsDataSDK.quick('isReady', function () {
          sensorsDataSDK.use('SensorsChannel', {});
          sensorsDataSDK.quick('autoTrack', {
            page_type: document.title,
          });
        });
      } else {
        console.info('神策不符合初始化条件');
      }
    },
    login: (userId: string) => {
      sensorsDataSDK?.login(userId);
    },
    logout: () => {
      sensorsDataSDK?.logout();
    },
    autoTrack(title?: string) {
      sensorsDataSDK?.quick('autoTrack', {
        page_type: title || document.title,
      });
    },
    track(e: string, p?: object, c?: any) {
      sensorsDataSDK?.track(e, p, c);
    },
  };

})();

export default sensor;
