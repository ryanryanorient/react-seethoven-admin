import { genMessage } from '../help';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

import sys from './sys'
import common from './common'
import component from './component'
import layout from './layout'
import basic from './routes/basic'
import dashboard from './routes/dashboard'
import demo from './routes/demo'

const zh_CN = genMessage({
    common,
    component,
    layout,
    sys,
    'routes.basic': basic,
    'routes.dashboard': dashboard,
    'routes.demo': demo,
}, '');

export default zh_CN;
