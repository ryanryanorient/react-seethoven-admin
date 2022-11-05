// import { env } from 'process';
import pkg from '../../package.json';

// export const getEnv = () => {
//     return env.MODE
// }

// export const getAppEnvConfig = () => {
//     const {
//         REACT_APP_APP_TITLE,
//         REACT_APP_API_URL,
//         REACT_APP_APP_SHORT_NAME,
//         REACT_APP_API_URL_PREFIX,
//         REACT_APP_UPLOAD_URL,
//     } = env;

//     return {
//         REACT_APP_APP_TITLE,
//         REACT_APP_API_URL,
//         REACT_APP_APP_SHORT_NAME,
//         REACT_APP_API_URL_PREFIX,
//         REACT_APP_UPLOAD_URL,
//     };
// }

export function getCommonStoragePrefix() {
    // const { REACT_APP_APP_SHORT_NAME } = getAppEnvConfig();
    // return `${REACT_APP_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
    return 'SEETHOVEN_DEV'
}

// Generate cache key according to version
export function getStorageShortName() {
    return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}