"use client"
import { useCookieTheme } from '@/hooks/useItemFromCookie';
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

function StyledAntdThemeProvider({ children }: { children: ReactNode }) {
    // const editorTheme = useSelector(selectEditorTheme)
    const {theme} = useCookieTheme()
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default StyledAntdThemeProvider;
