/** @format */

import React, { useEffect, useState } from 'react';
import { format, addDays, isToday, isYesterday, isThisYear, formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import zhTW from 'date-fns/locale/zh-TW';
import zhCN from 'date-fns/locale/zh-CN';

interface TimeAgoProps {
  mode?: 'default' | 'verbose';
  date: string | number;
  [key: string]: unknown;
}

const locales = {
  'zh-CN': {
    locale: zhCN,
    excludes: ['不到', '大约'],
    datetime: 'M月d日 HH:mm',
    fulldatetime: 'yyyy年MM月dd日',
    yesterday: '昨天',
    twoDaysAgo: '前天',
  },
  zh_tw: {
    locale: zhTW,
    excludes: ['不到', '大約'],
    datetime: 'M月d日 HH:mm',
    fulldatetime: 'yyyy年MM月dd日',
    yesterday: '昨天',
    twoDaysAgo: '前天',
  },
  en: {
    locale: enUS,
    excludes: ['less than', 'about'],
    datetime: 'MMM d HH:mm',
    fulldatetime: 'yyyy-MM-dd',
    yesterday: 'yesterday',
    twoDaysAgo: false,
  },
};
/**
 * @param {*} props
 * @param {String} props.mode - 模式，支持`default/verbose`
 * @param {String} date - 日期
 */
export const TimeAgo: React.FC<TimeAgoProps> = function ({ mode = 'default', date, ...props }) {
  const datetime = new Date(date);
  const config = locales['zh-CN' as 'zh-CN' | 'zh_tw' | 'en'] || locales['zh-CN'];

  function formatDate() {
    if (!(datetime instanceof Date) || Number.isNaN(datetime.getTime())) {
      return '';
    }
    if (isToday(datetime) || mode !== 'verbose') {
      let str = formatDistanceToNow(datetime, {
        locale: config.locale,
        includeSeconds: true,
        addSuffix: true,
      });
      config.excludes.forEach((key) => {
        str = str.replace(key, '');
      });
      return str.trim();
    }
    if (isYesterday(datetime)) {
      return `${config.yesterday} ${format(addDays(datetime, 1), 'HH:mm')}`;
    }
    if (config.twoDaysAgo && isToday(addDays(datetime, 2))) {
      return `${config.twoDaysAgo} ${format(addDays(datetime, 2), 'HH:mm')}`;
    }
    if (isThisYear(datetime)) {
      return format(datetime, config.datetime);
    }
    return format(datetime, config.fulldatetime);
  }

  const [text, setText] = useState(() => formatDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setText(formatDate());
    }, 5000);
    setText(formatDate());
    return () => {
      clearInterval(timer);
    };
  }, [mode, date]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span title={datetime.toLocaleString()} {...props}>
      {text}
    </span>
  );
};
