import React from 'react'
import { BaseATable } from '../_Base';
import { TableProps } from 'antd';
import { useTheme } from '@/context/ThemeContext';
import { themeConfig } from '@/config/themeConfig';

const NRATable = (props: TableProps) => {
  const { themeName } = useTheme();
    const theme = themeConfig(themeName);
  return (
    <BaseATable theme={theme} {...props} />
  )
}

export default NRATable;