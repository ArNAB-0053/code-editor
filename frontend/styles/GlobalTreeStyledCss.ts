import { ThemeTypes } from "@/@types/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { createGlobalStyle } from "styled-components";

export const GlobalTreeStyles = createGlobalStyle<{
  $theme: ThemeTypes;
  $font?: NextFont;
}>`
  .atree {
      .ant-tree {
              background: transparent !important;
          }

          .ant-tree:hover,
          .ant-tree-title:hover {
              // color: ${({ $theme }) => $theme?.hoverTextColor} !important;
              transition-property: all;
              transition-duration: 150ms;
              transition-timing-function: linear;
          }

        .ant-tree-node-content-wrapper:hover {
          color: inherit !important;
        }

        .ant-tree-treenode-selected .ant-tree-node-content-wrapper:before {
          background-color: transparent !important;
        }

        .ant-tree, .ant-tree-node-content-wrapper.ant-tree-node-selected {
          background-color: transparent !important;
          color: ${({ $theme }) => $theme.hoverTextColor} !important;
          // padding-top: 6px !important;
        }

        .ant-tree-title {
          width: 100% !important;
          position: relative !important;
        }

        .ant-tree-title,  .ant-tree-treenode, .ant-tree-node-content-wrapper {
          display: flex !important;
          align-items: center !important;
          padding-inline:  0px !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }

        .ant-tree-indent-unit {
          width: 24px !important;
        }

        .ant-tree-indent-unit:before {
          opacity: 0.5 !important;
        }

      //   .ant-tree, .ant-tree-node-content-wrapper {
      //     padding: 2px 0 0 !important;
      //   }

        .ant-tree-switcher {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .ant-tree-list-holder-inner   
          > .ant-tree-treenode:first-child
          > .ant-tree-node-content-wrapper {
          height: 100% !important;
        } 

        .ant-tree-list-holder-inner   
          > .ant-tree-treenode:first-child
          > .ant-tree-node-content-wrapper > .ant-tree-title {
          height: 36px !important;
        } 

        .ant-tree-list-holder-inner   
          > .ant-tree-treenode:first-child {
            // margin: 5px 0 0 0 !important;
            // padding: 5px 0 !important;
            background-color: ${({ $theme }) => $theme.border10} !important;
        } 


        .ant-tree-switcher-noop {
          opacity: 0.5 !important;
        }

        .ant-tree-treenode {
          box-shadow: none !important;
          background-color: transparent !important;
          line-height: 26px !important;
        }

        .ant-tree-treenode-selected {
          background-color: ${({ $theme }) => $theme.border10} !important;
          box-shadow:
            inset 0 1px 0 ${({ $theme }) => $theme.border15},
            inset 0 -1px 0 ${({ $theme }) => $theme.border15} !important;

          border-radius: 0 !important;
        }


        .ant-tree-treenode:hover {
        color: ${({ $theme }) => $theme.textColor} !important;
            background-color: ${({ $theme }) => $theme.border5} !important;
            transition-property: all;
            transition-duration: 150ms;
            transition-timing-function: linear;
        }

        .ant-tree-switcher {
          margin-inline-end: 0px !important;
        }

      //   .ant-tree-indent {
      //     width: 0px !important;
      //   }

        .ant-tree-treenode {
          // padding: 2px 0 0 !important;
          margin-bottom: 0px !important;
          // line-height: 12px !important;
          width: calc(100% + 16px) !important;
        }

        .ant-tree-switcher {
          transition: transform 0.15s ease-in-out;
        }

        .ant-tree-switcher_open {
          transform: rotate(90deg);
        }

        .ant-tree-switcher_close {
          transform: rotate(0deg);
        }
  }  
`;