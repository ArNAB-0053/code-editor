"use client"
import { QUERY_KEYS } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { getChildren as getChildrenApi } from "@/services/files"; // Import the actual API function

export const useChildrenTree = () => {
  const queryClient = useQueryClient();

  const getChildren = async (parentId?: string | null) => {
    const data = await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.FILE, parentId ?? null],
      queryFn: () => getChildrenApi(parentId ?? null), 
    });
    
    return data; 
  };

  return { getChildren };
};