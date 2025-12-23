// ----------------------------------------------------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ----------------------------------------------------------------------------------

//                              NOTE: GLOBAL STYLED COMPONENT

// ----------------------------------------------------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ----------------------------------------------------------------------------------

import { ThemeTypes } from "@/@types/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { createGlobalStyle } from "styled-components";


// THIS IS FOR GLOBAL STYLED PROPERTISE - ALL (stared with "A" or Normal antd) `antd` PROPERTISE ARE DESIGN FROM HERE
export const GlobalStyles = createGlobalStyle<{
  $theme: ThemeTypes;
  $font: NextFont;
}>`
  .ant-card {
    background: ${({ $theme }) => $theme?.border10} !important;
    color: ${({ $theme }) => $theme?.textColor} !important;
  }

  .ant-card-bordered {
    border-color: ${({ $theme }) => $theme?.border} !important;
  }
  .ant-card-body {
    padding: 10px !important;
  }

  .ant-breadcrumb-link, .ant-breadcrumb-separator {
    color: ${({ $theme }) => $theme?.textColor} !important;
  }
  
  .ant-breadcrumb-link {
    // background: ${({ $theme }) => $theme?.border20} !important;
    // padding: 0 4px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

   

  // -----------------------------------------------------------------------------------
  //                    antd Tabs that is inside "share" class.
  // -----------------------------------------------------------------------------------
  .share, .files {
    .ant-tabs-nav {
      margin: 0 !important;
    }

    .ant-tabs-top > .ant-tabs-nav::before {
      display: none !important;
    }

    .ant-tabs-ink-bar {
      display: none !important;
    }

    .ant-tabs-nav-wrap {
      
      padding: 5px;
      border-radius: 8px;
      flex: none !important;
    }

    .ant-tabs >.ant-tabs-nav {
      justify-content: space-between !important;
      margin-bottom: 12px !important;
    }

    .ant-tabs-nav-list {
      gap: 4px !important;
    }

    .ant-tabs-tab {
      margin: 0 !important;
      padding: 4px 8px !important;
      border-radius: 6px;
      color: ${({ $theme }) => $theme.disabledTextColor};
      transition: all 0.2s ease;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
      

    /* Hover */
    .ant-tabs-tab:hover {
      color: ${({ $theme }) => $theme.activeColor} !important;
      background: ${({ $theme }) => $theme.activeColor}20 !important;
      opacity: 80% !important;
    }

    /* Active tab */
    .ant-tabs-tab.ant-tabs-tab-active {
      background: ${({ $theme }) => $theme.activeColor}50 !important;
      color: ${({ $theme }) => $theme.activeColor} !important;
    }
  }  

  .files {
    .ant-tabs-nav-wrap {
      background: transparent !important;
    }
  
    .ant-tabs-nav-wrap {
      padding: 4px 0 !important;  
    }

    .ant-tabs-tab-btn {
      font-family: ${({ $font }) =>
        $font ? $font.style.fontFamily : "inherit"} !important;
      font-size: 14px !important;
      font-weight: 500 !important;
            display: flex !important;
      align-items: center !important;
      justify-content: start !important;
    }
    .ant-tabs-tab {
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Active tab */
    .ant-tabs-tab.ant-tabs-tab-active {
      background: transparent !important;
      border-radius: 6px !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active > .ant-tabs-tab-btn  {
      color: ${({ $theme }) => $theme.textColor} !important;
      border-radius: 6px !important;
    }

    /* Hover */
    .ant-tabs-tab:hover {
      color: ${({ $theme }) => $theme.disabledTextColor} !important;
      background: transparent !important;
      opacity: 100% !important;
      border-radius: 6px !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active:hover > .ant-tabs-tab-btn, .ant-tabs-tab-btn:focus:not(:focus-visible)  {
      color: ${({ $theme }) => $theme.disabledTextColor} !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active:hover > .ant-tabs-tab-btn {
      background: transparent !important;
    }

    .ant-tabs-content-holder {
      border-left: none !important;
    }

    .ant-tabs-tab-disabled {
      opacity: 100% !important;
      color: ${({ $theme }) => $theme.textColor} !important;
      display: block !important;
    }
  }

  .share {
    .ant-tabs-nav-wrap {
        width: fit-content !important;
        height: 100% !important;
        background: ${({ $theme }) => $theme.border10} !important;
    }

    /* Remove default active bold */
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-weight: 500;
      scale: 110%;
    }

    .ant-tabs-nav-wrap {
      padding: 0 !important;  
    }

    .ant-tabs-tab.ant-tabs-tab-active {
      background: ${({ $theme }) => $theme.activeColor} !important;
    }

    .ant-tabs-tab-btn {
      width: 1.2rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* Hover */
    .ant-tabs-tab:hover {
      color: ${({ $theme }) => $theme.textColor} !important;
      background: ${({ $theme }) => $theme.activeColor}50 !important;
      opacity: 100% !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active:hover > .ant-tabs-tab-btn  {
      color: ${({ $theme }) => $theme.textColor} !important;
    }

    .ant-tabs-tab {
      margin: 0 !important;
      padding: 8px 10px !important;
    }
  }
  
`;