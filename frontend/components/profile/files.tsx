import React from "react";
import { Heading } from "./base";
import { EmptyContent } from "../empty";

const FilesComponent = () => {
  return (
    <>
      <Heading className="mt-3">Files</Heading>
      <EmptyContent title="No public files" rootClassName="opacity-60! mt-10!" />
    </>
  );
};

export default FilesComponent;
