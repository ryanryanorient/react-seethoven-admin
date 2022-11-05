import i18n from 'i18next';
import {
    initReactI18next
} from 'react-i18next';


import en from "./lang/en";
import zhCN from "./lang/zh-CN";

const lng = 'zh';
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    ...en
                },
            },
            zh: {
                translation: {
                    ...zhCN
                },
            },
        },
        lng: lng,
        fallbackLng: lng,


        interpolation: {
            escapeValue: false,
        },
    });
export default i18n