import { useContext, createContext } from "react";

export interface AppProviderContextProps {
    prefixCls: string;
    isMobile: boolean;
}

const context = createContext({ prefixCls: 'vben', isMobile: false })

export function useAppProviderContext() {
    return useContext<AppProviderContextProps>(context);
}