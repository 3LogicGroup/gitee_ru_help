/** @format */

const iconConfig: any = {};

iconConfig.gitee = (ic) => `gitee-icon ${ic}`;

iconConfig.project = {
  0: 'gitee-icon project-private',
  1: 'gitee-icon project-public',
  2: 'gitee-icon pull-request',
  default: 'gitee-icon project-private',
};

iconConfig.team = {
  0: 'gitee-icon lock-outline',
  1: 'gitee-icon team-mini',
  2: 'gitee-icon lock-outline',
  default: 'gitee-icon lock-outline',
};

export default iconConfig;
