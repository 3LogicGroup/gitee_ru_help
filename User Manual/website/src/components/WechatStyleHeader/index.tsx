import React from 'react';
import TrianglePng from './images/triangle.png';

export const WechatStyleH2 = ({ title }) => {
  return (
    <h2 style={{ textAlign: 'center', color: 'rgb(0, 87, 255)' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          marginRight: '16px',
          backgroundImage: `url(${TrianglePng})`,
        }}
      />
      {title}
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(180deg)',
          marginLeft: '16px',
          backgroundImage: `url(${TrianglePng})`,
        }}
      />
    </h2>
  );
};

export const WechatStyleH3 = ({ title }) => {
  return (
    <h3 style={{ textAlign: 'center', color: 'rgb(0, 87, 255)' }}>
      <span style={{ display: 'inline-block' }}>
        {title}
        <span
          style={{
            display: 'inline-block',
            marginRight: '50%',
            width: '150%',
            height: '2px',
            float: 'right',
            transform: 'translate(50%)',
            backgroundImage: 'linear-gradient(to right, transparent, rgb(10, 254, 213), transparent)',
          }}
        ></span>
      </span>
    </h3>
  );
};
