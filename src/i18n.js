import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import zh_common from './translations/zh/common';
import en_common from './translations/en/common';
import zh_home from './translations/zh/home';
import en_home from './translations/en/home';

const resources = {
    zh: {
        common: { // namespace的名称
            ...zh_common,
        },
        home: {
            ...zh_home
        }
    },
    en: {
        common: {
            ...en_common,
        },
        home: {
            ...en_home
        }
    },
};

i18n.use(initReactI18next)
    .init({
        resources,
        lng: 'zh',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
