import { LocaleType } from "@/types/config";

export const loadLocalePool: LocaleType[] = [];
/**
 * 设置网页语言
 * @param locale 
 */
 export const setHtmlPageLang = (locale: LocaleType) => {
    document.querySelector('html')?.setAttribute('lang', locale);
}

/**
 * 
 * @param cb 设置语言池
 */
export const setLoadLocalePool = (cb: (loadLocalePool: LocaleType[]) => void) => {
    cb(loadLocalePool);
}
