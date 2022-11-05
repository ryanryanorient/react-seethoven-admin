import React from 'react';
import { ConfigProvider } from 'antd';
import '@/locales';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//import 'antd/dist/antd.min.css'
// import 'antd/es/style/themes/default.less';
import 'antd/dist/antd.less'

// import './App.css';
import './assets/styles/global.less'
import Login from './pages/sys/Login';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Login />
    </ConfigProvider>
  );
}

export default App;
