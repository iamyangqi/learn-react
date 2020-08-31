# 添加i18n国际化
    yarn add i18n react-i18n
    
文档： https://react.i18next.com/guides/quick-start
##### 1. 在src目录下，添加translations文件夹，用以放置i18n的内容，以中英双语为例，新建zh/en两个文件夹

zh/common.js

    export default {
        Login: '登录'
    }
    
en/common.js

    export default {
        Login: 'Login'
    }
    
##### 2. 在src下添加i18n配置文件
i18n.js

    import i18n from 'i18next';
    import {initReactI18next} from "react-i18next";
    import zh_common from './translations/zh/common';
    import en_common from './translations/en/common';
    
    const resources = {
        zh: {
            common: { // namespace的名称
                ...zh_common
            }
        },
        en: {
            common: {
                ...en_common
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

##### 3. 在Login组件中使用i18n

    const {t, i18n} = useTranslation();
    <h1>{t('common:Login')}</h1>
    
##### 4. 动态切换语言

    const changeLng = React.useCallback(() => {
        let lng = i18n.language;
        lng = lng === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(lng);
    }, []);

