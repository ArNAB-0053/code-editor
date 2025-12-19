// ----------------------------------------------------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ----------------------------------------------------------------------------------

//                              NOTE: GLOBAL STYLED COMPONENT

// ----------------------------------------------------------------------------------
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ----------------------------------------------------------------------------------

import { ThemeTypes } from "@/@types/theme";
import { createGlobalStyle } from "styled-components";


// THIS IS FOR GLOBAL STYLED PROPERTISE - ALL (stared with "A" or Normal antd) `antd` PROPERTISE ARE DESIGN FROM HERE
export const GlobalStyles = createGlobalStyle<{
  $theme: ThemeTypes;
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
  .share {
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
      background: ${({ $theme }) => $theme.border10};
      padding: 5px;
      border-radius: 8px;
      width: fit-content !important;
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

    /* Remove default active bold */
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-weight: 500;
      scale: 110%;
    }
  }  
`;