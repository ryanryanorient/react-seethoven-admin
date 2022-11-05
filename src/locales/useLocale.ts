import { localeSelector, setLocaleInfo, showPickerSelector } from '@/store/locale';
import { useAppDispatch } from '@/store/redux-hooks';
import { LocaleType } from '@/types/config';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setHtmlPageLang, loadLocalePool } from './helper';
const { i18n } = useTranslation()

interface LangModule {
    message: Recordable;
    dateLocale: Recordable;
    dateLocaleName: string;
}



function setI18nLanguage(locale: LocaleType) {
    const dispatch = useAppDispatch()
    dispatch(setLocaleInfo(locale))
    setHtmlPageLang(locale);
}

export function useLocale() {

    const getLocale = useSelector(localeSelector);
    const getShowLocalePicker = useSelector(showPickerSelector);

    // Switching the language will change the locale of useI18n
    // And submit to configuration modification
    async function changeLocale(locale: LocaleType) {

        const globalI18n = i18n;
        const currentLocale = i18n.language;
        if (currentLocale === locale) {
            return;
        }

        if (loadLocalePool.includes(locale)) {
            setI18nLanguage(locale);
            return locale;
        }
        
        loadLocalePool.push(locale);

        setI18nLanguage(locale);
        return locale;
    }

    return {
        getLocale,
        getShowLocalePicker,
        changeLocale,
    };
}