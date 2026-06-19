import React from "react";

import { EmptyContent } from "../empty";
import { Heading } from "../_base/_base";

const FilesComponent = () => {
  return (
    <>
      <Heading className="mt-3">Files</Heading>
      <EmptyContent title="No public files" rootClassName="opacity-60! mt-10!" />
    </>
  );
};

export default FilesComponent;
