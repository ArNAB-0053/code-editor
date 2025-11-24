import React from 'react'
import { BaseATable } from '../_Base';
import { TableProps } from 'antd';
import { useCookieTheme } from '@/hooks/useItemFromCookie';

const NRATable = (props: TableProps) => {
    const { theme, cookieTheme } = useCookieTheme();
  return (
    <BaseATable theme={theme} {...props} />
  )
}

export default NRATable;