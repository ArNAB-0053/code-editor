import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";
import { createRepoRequest } from "@/app/api/github/create-repo/route";
import { toast } from "sonner";
import { messagesConfig } from "@/config/messages.config";

export interface createFileProps {
  owner: string;
  repo: string;
  path: string;
  content: string;
  message?: string;
}

// CREATE (POST) - Repo
export async function createGithubRepo({ repoName, owner }: createRepoRequest) {
  const toastId = toast.loading(messagesConfig.PUBLISH.FILE.LOADING);
  const res = await fetch("/api/github/create-repo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repoName, owner }),
  });
  if (!res.ok) {
    toast.error(messagesConfig.PUBLISH.FILE.ERROR);
    throw new Error("Failed to create repo");
  } else toast.success(messagesConfig.PUBLISH.FILE.SUCCESS, { id: toastId });
  return res.json();
}

// CREATE (POST) - File
export async function createGithubFile(payload: createFileProps) {
  const toastId = toast.loading(messagesConfig.PUBLISH.FILE.LOADING);
  const res = await fetch("/api/github/create-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    toast.error(messagesConfig.PUBLISH.FILE.ERROR);
    throw new Error("Failed to create repo");
  } else {
    toast.success(messagesConfig.PUBLISH.FILE.SUCCESS, { id: toastId });
  }

  return res.json();
}

// GET - Repos
export async function getGithubRepos() {
  const res = await fetch("/api/github/get-repo");
  if (!res.ok) {
    throw new Error("Failed to create repo");
  }
  return res.json();
}

export const useGithubRepos = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GITHUB],
    queryFn: () => getGithubRepos(),
  });
};
