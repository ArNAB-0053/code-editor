import { FileTypeEnum } from "@/@types/_enums";
import { AButton, AForm } from "@/components/ui/antd";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { useFileCreation } from "@/services/files";
import { CreateFilesFormType, filesSchema } from "@/zod/files.z";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";
import { FormItemComponent } from "@/components/form-item-component";
import { FaFolderPlus } from "react-icons/fa";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { toast } from "sonner";

export const FilesCreationForm = () => {
  const { mutateAsync: createFile } = useFileCreation();
  const userId = useSelector(selectedUserId);

  const initialValues: CreateFilesFormType = {
    OwnerId: userId,
    FileName: "",
    FileType: FileTypeEnum.FILE,
    Lang: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(filesSchema)}
      closeOnSubmit
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading("Creating file...");
        await createFile(values, {
          onSuccess: (res) => {
            console.log(res);
            if (res?.status === "success")
              toast.success("File created successfully!", { id: toastId });
            else toast.error("Error creating file", { id: toastId });
          },
          onError: () => {
            toast.error("Error creating file", { id: toastId });
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
            <FormItemComponent
              name="fileName"
              value={values?.FileName}
              onChange={handleChange("FileName")}
              formItemChildren="File Name"
              onBlur={handleBlur("FileName")}
              placeholder="Enter file name"
              errorText={errors?.FileName}
              touched={touched?.FileName}
              formItemClassName="my-0!"
            />
            <FormItemComponent
              name="fileName"
              value={values?.Lang || ""}
              onChange={handleChange("Lang")}
              formItemChildren="Lang"
              onBlur={handleBlur("Lang")}
              placeholder="Ex: py, js etc."
              errorText={errors?.Lang}
              touched={touched?.Lang}
              formItemClassName="my-0!"
            />

            <div className="flex items-center justify-end mt-6">
              <AButton
                type="primary"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex! items-center! justify-center!"
              >
                <BsFileEarmarkPlusFill  />
                Create File
              </AButton>
            </div>
          </AForm>
        );
      }}
    </Formik>
  );
};

export const FolderCreationForm = () => {
  const { mutateAsync: createFile } = useFileCreation();
  const userId = useSelector(selectedUserId);

  const initialValues: CreateFilesFormType = {
    OwnerId: userId,
    FileName: "",
    FileType: FileTypeEnum.FOLDER,
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(filesSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading("Creating folder...");
        await createFile(values, {
          onSuccess: (res) => {
            console.log(res);
            if (res?.status === "success")
              toast.success("Folder created successfully!", { id: toastId });
            else toast.error("Error creating folder", { id: toastId });
          },
          onError: () => {
            toast.error("Error creating folder", { id: toastId });
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
            <FormItemComponent
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
                onClick={handleSubmit}
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
