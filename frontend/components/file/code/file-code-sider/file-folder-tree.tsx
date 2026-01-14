"use client";
import React, { useEffect, useState } from "react";
import { TreeProps } from "antd";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import ATree from "@/components/ui/antd/tree";
import { IFilesModel } from "@/@types/files";
import { FileTypeEnum } from "@/@types/_enums";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { useDispatch } from "react-redux";
import { setCreatedFileIdRedux } from "@/redux/slices/createdFilesEditorSlice";
import { cn } from "@/lib/utils";
import { LuLoaderCircle } from "react-icons/lu";
import {
  selectLastRefreshedNode,
  selectTreeRefreshKey,
  setFolderId,
} from "@/redux/slices/fileFolderSlice";
import { useChildrenTree } from "@/hooks/useChildrenTree";
import { DataNode, TitleRenderComponent } from ".";
import { SetterFunctionTypesBool } from "@/@types/_base";

interface FileFolderTreeProps {
  setOpenFile: SetterFunctionTypesBool;
  setOpenFolder: SetterFunctionTypesBool;
}

const mapToTreeNode = (item: IFilesModel): DataNode => ({
  key: item.id,
  isLeaf: item.fileType === "FILE",
  fileType: item.fileType,
  fileName: item.fileName,
  title: item.fileName,
  lang: item.lang,
});

const updateTreeData = (
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const FileFolderTree = ({
  setOpenFile,
  setOpenFolder,
}: FileFolderTreeProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  // const currentFolderId = useSelector(selectFolderId);
  const treeRefreshKey = useSelector(selectTreeRefreshKey);
  // const currectFile = useSelector(selectedfileId)
  const lastRefreshedNode = useSelector(selectLastRefreshedNode);

  // const {data: rootParentId} = useParentId(currectFile)
  // console.log("currentFolder => ", currentFolderId, treeRefreshKey);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["root"]);
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: (
        <>
          <span
            className={cn("text-xs uppercase tracking-wide px-2")}
            style={{
              color: theme.disabledTextColor,
              // borderBlockColor: theme.border20,
              fontWeight: 500,
            }}
          >
            file-and-folder
          </span>
        </>
      ),
      key: "root",
      fileType: FileTypeEnum.FOLDER,
      fileName: "file-and-folder"
    },
  ]);

  const router = useRouter();
  const dispatch = useDispatch();

  // const { data: fileFolders, refetch } = useChilren(currentFolderId);
  // console.log(fileFolders)

  // a hook for getting children data for tree
  const { getChildren } = useChildrenTree();

  /* 
        (Refetch) - when new file/folder created 
        Note: may not be optimised way but for now overlooking that.
  */
  useEffect(() => {
    const refresh = async () => {
      if (!lastRefreshedNode) return;

      const refreshKey = lastRefreshedNode;
      // console.log("==== Refreshing node:", refreshKey);

      // Fetch fresh data
      const data = await getChildren(
        refreshKey === "root" ? null : String(refreshKey)
      );
      // console.log("==== Fresh data:", data);
      const children = data.data.map(mapToTreeNode);

      // Update the tree
      setTreeData((origin) => updateTreeData(origin, refreshKey, children));
    };

    refresh();
  }, [treeRefreshKey, lastRefreshedNode]);

  const onLoadData = async ({ key, children }: any) => {
    if (children) return;
    const parentId = key === "root" ? null : String(key);
    const data = await getChildren(parentId);
    const treeChildren = data?.data?.map(mapToTreeNode);
    setTreeData((origin) => updateTreeData(origin, key, treeChildren));
  };

  const onExpand: TreeProps["onExpand"] = (keys) => {
    setExpandedKeys(keys);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    // console.log(info.node.key);
    if (info.node.fileType === FileTypeEnum.FILE) {
      dispatch(setCreatedFileIdRedux(info.node.key as string));
      router.push(`${appUrls.CODE}/${info.node.key}`);
    } else {
      dispatch(
        setFolderId(info.node.key === "root" ? null : String(info.node.key))
      );
    }
  };

  return (
    <div className="border border-r-0 border-white/20 w-full pr-4 h-full overflow-y-auto custom-scrollbar-sider pb-3">
      <ATree
        loadData={onLoadData}
        treeData={treeData}
        showIcon={false}
        switcherIcon={<FaChevronRight className="opacity-75" />}
        switcherLoadingIcon={
          <LuLoaderCircle className="animate-spin " size={10} />
        }
        onSelect={onSelect}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        showLine
        titleRender={(node: DataNode) => {
          const isExpanded = expandedKeys.includes(node.key);
          return (
            <TitleRenderComponent
              isExpanded={isExpanded}
              node={node}
              setOpenFile={setOpenFile}
              setOpenFolder={setOpenFolder}
            />
          );
        }}
      />
    </div>
  );
};

export default FileFolderTree;
