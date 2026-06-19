import { IModalProps } from "@/@types/_base";
import { createRepoRequest } from "@/app/api/github/create-repo/route";
import { AInputWithLabel, ASelectWithLabel } from "@/components/_base/_base";
import { AButton, AModal } from "@/components/ui/antd";
import { getExtention } from "@/helper/getExtention";
import {
  selectedCreatedFileCode,
  selectedCreatedFileLang,
  selectedCreatedFileName,
} from "@/redux/slices/createdFilesEditorSlice";
import {
  createFileProps,
  createGithubFile,
  createGithubRepo,
  useGithubRepos,
} from "@/services/github";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const PublishFileModal = ({ open, setOpen }: IModalProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [commit, setCommit] = useState("");

  const { data: repos } = useGithubRepos();
  const { data: session, status } = useSession();

  const currentCode = useSelector(selectedCreatedFileCode);
  const currentFileName = useSelector(selectedCreatedFileName);
  const currentLang = useSelector(selectedCreatedFileLang);

  const ext = getExtention(currentLang);
  const path = `${currentFileName}${ext}`;

  const allRepos = useMemo(() => {
    return (
      repos?.map((repo: any) => ({
        value: repo.name,
        label: repo.name,
      })) ?? []
    );
  }, [repos]);

  useEffect(() => {
    if (!selectedValue && allRepos.length > 0) {
      setSelectedValue(allRepos[0].value);
    }
  }, [allRepos, selectedValue]);

  const payload: createFileProps = {
    owner: session?.user?.username as string,
    repo: selectedValue!,
    path,
    content: currentCode,
    message: commit || `Update ${path}`,
  };

  const handlePublish = async () => {
    await createGithubFile(payload);
    setOpen(false);
  };

  if (status === "loading") return;

  return (
    <AModal
      title="Publish to GitHub"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      className="overflow-hidden w-[22rem]!"
    >
      {/* Repository */}
      <ASelectWithLabel
        value={selectedValue as string}
        label="Repository"
        onChange={setSelectedValue}
        options={allRepos}
        placeholder="Select a repository"
        selectClassName="w-full! rounded-md! backdrop-blur-2xl!"
        rootClassName="my-3"
      />

      {/* File info */}
      <AInputWithLabel label="File" value={path} disabled />

      {/* Commit message */}
      <AInputWithLabel
        label="Commit message"
        value={commit}
        onChange={(e) => setCommit(e.target.value)}
        placeholder={`Update ${path}`}
        rootClassName="mt-3! mb-6"
      />

      {/* Action */}
      <AButton
        type="primary"
        block
        disabled={!selectedValue}
        onClick={handlePublish}
      >
        <span className="flex items-center justify-center gap-x-1">
          {/* <IoMdGitBranch size={20}/> */}
          Publish file
        </span>
      </AButton>
    </AModal>
  );
};

export const PublishRepoModal = ({ open, setOpen }: IModalProps) => {
  const [value, setSelectedValue] = useState<string>();

  const { data: session, status } = useSession();

  const payload: createRepoRequest = {
    owner: session?.user?.username,
    repoName: value ?? "repo",
  };

  const handlePublish = async () => {
    await createGithubRepo(payload);
    setOpen(false);
  };

  if (status === "loading") return;

  return (
    <AModal
      title="Publish to GitHub"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      className="overflow-hidden w-[22rem]!"
    >
      {/* Repository */}
      <AInputWithLabel
        label="Repository"
        value={value as string}
        onChange={(e) => setSelectedValue(e.target.value)}
        placeholder="Enter repo name"
        rootClassName="mt-3! mb-6"
      />

      {/* Action */}
      <AButton type="primary" block disabled={!value} onClick={handlePublish}>
        <span className="flex items-center justify-center gap-x-1">
          {/* <IoMdGitBranch size={20}/> */}
          Publish repo
        </span>
      </AButton>
    </AModal>
  );
};
