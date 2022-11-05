import type { LocaleSetting, LocaleType } from '@/types/config';
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import { localeSetting } from '@/settings/localeSetting';
import { RootState } from '..';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

const localeSlice = createSlice({
    name: 'locale',
    initialState: lsLocaleSetting,
    reducers: {
        setLocaleInfo(state, action) {
            state.locale = action.payload
            ls.set(LOCALE_KEY, action.payload);
        }
    }
})

const selectSelf = (state: LocaleSetting) => state
// const localeSelector = createSelector(selectSelf, (state) => state.locale)
// const showPickerSelector = createSelector(selectSelf, (state) => state.showPicker)
const localeSelector = (state: RootState) => state.localeReducer.locale
const showPickerSelector = (state: RootState) => state.localeReducer.showPicker

export { localeSelector, showPickerSelector }




export const { setLocaleInfo } = localeSlice.actions

export default localeSlice.reducer