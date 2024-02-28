/** @format */

export default {
  init() {
    if (!window.ud) {
      this.createUdeskScript();
    }
  },
  createUdeskScript() {
    (function (a, h, c, b, f, g) {
      a['UdeskApiObject'] = f;
      a[f] =
        a[f] ||
        function () {
          (a[f].d = a[f].d || []).push(arguments);
        };
      g = h.createElement(c);
      g.async = 1;
      g.charset = 'utf-8';
      g.src = b;
      c = h.getElementsByTagName(c)[0];
      c.parentNode.insertBefore(g, c);
    })(window, document, 'script', 'https://assets-cli.s4.udesk.cn/im_client/js/udeskApi.js', 'ud');
    ud({
      code: '1hhcdjh',
      link: 'https://1588039.s4.udesk.cn/im_client/?web_plugin_id=2649',
      panel: {
        onToggle: (data) => {
          window.ud.visible = data.visible;
          const event = new Event('udeskVisible');
          event.value = data;
          window.dispatchEvent(event);
        },
      },
    });
  },
};
