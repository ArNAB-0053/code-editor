import { IModalProps } from "@/@types/_base";
import { createRepoRequest } from "@/app/api/github/create-repo/route";
import EditorLoader from "@/components/Loaders/editor";
import { AButton, AInput, AModal, ASelect } from "@/components/ui/antd";
import { themeConfig } from "@/config/themeConfig";
import { getExtention } from "@/helper/getExtention";
import {
  selectedCreatedFileCode,
  selectedCreatedFileLang,
  selectedCreatedFileName,
} from "@/redux/slices/createdFilesEditorSlice";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import {
  createFileProps,
  createGithubFile,
  createGithubRepo,
  useGithubRepos,
} from "@/services/github";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const PublishFileModal = ({ open, setOpen }: IModalProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [commit, setCommit] = useState("");

  const { data: repos } = useGithubRepos();
  const { data: session, status } = useSession();

  const currentCode = useSelector(selectedCreatedFileCode);
  const currentFileName = useSelector(selectedCreatedFileName);
  const currentLang = useSelector(selectedCreatedFileLang);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const ext = getExtention(currentLang);
  const path = `${currentFileName}${ext}`;

  const allRepos =
    repos?.map((repo: any) => ({
      value: repo.name,
      label: repo.name,
    })) ?? [];

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

  if (status === "loading") return <EditorLoader />;

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
      <div className="mb-4 mt-4">
        <label className="text-xs text-muted-foreground mb-1 block">
          Repository
        </label>
        <ASelect
          value={selectedValue}
          onChange={setSelectedValue}
          options={allRepos}
          placeholder="Select a repository"
          className="w-full! rounded-md!"
          optionBorderRadius="6px"
          dropdownRadius="8px"
        />
      </div>

      {/* File info */}
      <div className="mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">File</label>
        <AInput value={path} disabled />
      </div>

      {/* Commit message */}
      <div className="mb-6">
        <label className="text-xs text-muted-foreground mb-1 block">
          Commit message
        </label>
        <AInput
          value={commit}
          onChange={(e) => setCommit(e.target.value)}
          placeholder={`Update ${path}`}
        />
      </div>

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

  if (status === "loading") return <EditorLoader />;

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
      {/* <label className="text-xs text-muted-foreground mb-1 block">
        Repository
      </label> */}

      {/* File info */}
      <div className="mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">Repository</label>
        <AInput
          value={value}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      </div>

      {/* Action */}
      <AButton
        type="primary"
        block
        disabled={!value}
        onClick={handlePublish}
      >
        <span className="flex items-center justify-center gap-x-1">
          {/* <IoMdGitBranch size={20}/> */}
          Publish repo
        </span>
      </AButton>
    </AModal>
  );
};
