"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { TreeProps } from "antd";
import { getChildren, useChilren } from "@/services/files";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import ATree from "@/components/ui/antd/tree";
import { IFilesModel } from "@/@types/files";
import { getExtention, getFileIcon } from "@/helper/getExtention";
import { FileTypeEnum } from "@/@types/_enums";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { useDispatch } from "react-redux";
import { setCreatedFileIdRedux } from "@/redux/slices/createdFilesEditorSlice";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { AnimatePresence, motion } from "motion/react";
import { FolderClose, FolderOpen } from "@/assets/FolderIcon";
import { LuLoaderCircle } from "react-icons/lu";
import {
  selectFolderId,
  selectLastRefreshedNode,
  selectTreeRefreshKey,
  setFolderId,
} from "@/redux/slices/fileFolderSlice";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services";

interface DataNode {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  fileType: FileTypeEnum;
  children?: DataNode[];
  lang?: string;
}

const mapToTreeNode = (item: IFilesModel): DataNode => ({
  key: item.id,
  isLeaf: item.fileType === "FILE",
  fileType: item.fileType,
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
      console.log("==== MATCHED NODE", key);
      return { ...node, children };
    }
    if (node.children) {
      console.log("==== NOT MATCHED NODE");
      console.log("==== children", node.children);
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const FileFolderTree: React.FC = () => {
  const queryClient = useQueryClient();
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const currentFolderId = useSelector(selectFolderId);
  const treeRefreshKey = useSelector(selectTreeRefreshKey);
  // const currectFile = useSelector(selectedfileId)
  const lastRefreshedNode = useSelector(selectLastRefreshedNode);

  // const {data: rootParentId} = useParentId(currectFile)
  console.log("currentFolder => ", currentFolderId, treeRefreshKey);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["root"]);
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: (
        <>
          <span
            className={cn("text-xs uppercase tracking-wide translate-y-0.5")}
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
    },
  ]);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: fileFolders, refetch } = useChilren(currentFolderId);
  // console.log(fileFolders)

useEffect(() => {
  const refresh = async () => {
    if (!lastRefreshedNode) return;
    
    const refreshKey = lastRefreshedNode;
    console.log("==== Refreshing node:", refreshKey);

    // Fetch fresh data
    const data = await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.FILE, refreshKey === "root" ? null : refreshKey],
      queryFn: () =>
        getChildren(refreshKey === "root" ? null : String(refreshKey)),
    });

    console.log("==== Fresh data:", data);
    const children = data.data.map(mapToTreeNode);
    
    // Update the tree
    setTreeData((origin) => updateTreeData(origin, refreshKey, children));
  };

  refresh();
}, [treeRefreshKey, lastRefreshedNode]);

  const onLoadData = async ({ key, children }: any) => {
    if (children) return;
    const parentId = key === "root" ? null : String(key);

    const data = await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.FILE, parentId], // Use parentId as key
      queryFn: () => getChildren(parentId),
    });

    const treeChildren = data.data.map(mapToTreeNode);
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
    <div className="border border-r-0 border-white/20 w-full pr-4 h-full overflow-y-auto">
      <ATree
        loadData={onLoadData}
        treeData={treeData}
        showIcon={false}
        switcherIcon={<FaChevronRight className="opacity-75" />}
        switcherLoadingIcon={
          <LuLoaderCircle className="animate-spin translate-2 " size={10} />
        }
        onSelect={onSelect}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        showLine
        titleRender={(node: DataNode) => {
          const isExpanded = expandedKeys.includes(node.key);
          return (
            <>
              <span className="truncate max-w-[200px] flex items-center ">
                <AnimatePresence mode="wait" initial={false}>
                  {node.fileType === FileTypeEnum.FILE ? (
                    <p
                      className={cn(
                        "bg-white/20 px-1 h-3 rounded-md flex items-center justify-center text-[11px] mr-2",
                        jetBrainsMono.className
                      )}
                    >
                      {getFileIcon(node?.lang as string)}
                    </p>
                  ) : (
                    <motion.span
                      key={isExpanded ? "open" : "closed"}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="flex items-center mr-2"
                    >
                      {isExpanded ? (
                        <FolderOpen size={14} />
                      ) : (
                        <FolderClose size={14} />
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>

                {node.title}
                <span className="ml-0.5">
                  {node?.fileType === FileTypeEnum.FILE &&
                    getExtention(node?.lang as string)}
                </span>
              </span>
            </>
          );
        }}
      />
    </div>
  );
};

export default FileFolderTree;
