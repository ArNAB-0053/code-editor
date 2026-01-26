import { FileTypeEnum } from "@/@types/_enums";
import { AButton, AForm } from "@/components/ui/antd";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { useFileCreation } from "@/services/files";
import { CreateFilesFormType, filesSchema } from "@/zod/files.z";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";
import { FaFolderPlus } from "react-icons/fa";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { toast } from "sonner";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";
import { langs } from "@/constants/lang";
import { messagesConfig } from "@/config/messages.config";
import { FileCreationFormItemComponent } from "../form-item-component/file-creation";

export const FilesCreationForm = ({
  setOpen,
  initialValues,
  selecteLang,
}: {
  setOpen: SetterFunctionTypesBool;
  initialValues: CreateFilesFormType;
  selecteLang?: boolean;
}) => {
  const { mutateAsync: createFile } = useFileCreation();

  const langOptions = Object.entries(langs).map(([key, lang]) => ({
    value: key,
    label: lang.ext,
  }));

  // console.log(langOptions);

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(filesSchema)}
      enableReinitialize
      closeOnSubmit
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading("Creating file...");
        await createFile(values, {
          onSuccess: (res) => {
            if (res?.status === "success")
              toast.success(messagesConfig.CREATION.FILE.SUCCESS, {
                id: toastId,
              });
            else
              toast.error(messagesConfig.CREATION.FILE.ERROR, { id: toastId });
          },
          onError: () => {
            toast.error(messagesConfig.CREATION.FILE.ERROR, { id: toastId });
          },
        });
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        handleBlur,
      }) => {
        return (
          <AForm name="file-creation-form ">
            <FileCreationFormItemComponent
              name="fileName"
              value={values?.FileName}
              onChange={handleChange("FileName")}
              formItemChildren="File Name"
              onBlur={handleBlur("FileName")}
              placeholder="Enter file name"
              errorText={errors?.FileName}
              touched={touched?.FileName}
              formItemClassName="my-0!"
              isSelect={selecteLang}
              onSelectChange={handleChange("Lang")}
              options={langOptions}
              selectValue={values?.Lang}
            />
            {/* <FormItemComponent
              name="fileName"
              value={values?.Lang || ""}
              onChange={handleChange("Lang")}
              formItemChildren="Lang"
              onBlur={handleBlur("Lang")}
              placeholder="Ex: py, js etc."
              errorText={errors?.Lang}
              touched={touched?.Lang}
              formItemClassName="my-0!"
            /> */}

            <div className="flex items-center justify-end mt-6">
              <AButton
                type="primary"
                disabled={isSubmitting}
                onClick={async () => {
                  await handleSubmit();
                  setOpen(false);
                }}
                className="flex! items-center! justify-center!"
              >
                <BsFileEarmarkPlusFill />
                Create File
              </AButton>
            </div>
          </AForm>
        );
      }}
    </Formik>
  );
};

export const FolderCreationForm = ({
  setOpen,
}: {
  setOpen: SetterFunctionTypesBool;
}) => {
  const { mutateAsync: createFile } = useFileCreation();
  const userId = useSelector(selectedUserId);
  const currentFolderId = useSelector(selectFolderId);

  const initialValues: CreateFilesFormType = {
    OwnerId: userId,
    FileName: "",
    FileType: FileTypeEnum.FOLDER,
    ParentId: currentFolderId,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={zodToFormik(filesSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading("Creating folder...");

        await createFile(values, {
          onSuccess: (res) => {
            // console.log(res);
            if (res?.status === "success")
              toast.success(messagesConfig.CREATION.FOLDER.SUCCESS, {
                id: toastId,
              });
            else
              toast.error(messagesConfig.CREATION.FOLDER.ERROR, {
                id: toastId,
              });
          },
          onError: () => {
            toast.error(messagesConfig.CREATION.FOLDER.ERROR, { id: toastId });
          },
        });
        setSubmitting(false);
      }}
      closeOnSubmit
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        handleBlur,
      }) => {
        return (
          <AForm name="folder-creation-form">
            <FileCreationFormItemComponent
              name="fileName"
              value={values?.FileName}
              onChange={handleChange("FileName")}
              formItemChildren="Folder Name"
              onBlur={handleBlur("FileName")}
              placeholder="Enter folder name"
              errorText={errors?.FileName}
              touched={touched?.FileName}
              formItemClassName="my-0!"
            />

            <div className="flex items-center justify-end mt-6">
              <AButton
                type="primary"
                disabled={isSubmitting}
                onClick={async () => {
                  await handleSubmit();
                  setOpen(false);
                }}
                className="flex! items-center! justify-center!"
              >
                <FaFolderPlus />
                Create Folder
              </AButton>
            </div>
          </AForm>
        );
      }}
    </Formik>
  );
};
