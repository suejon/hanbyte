"use client";

import {
  UploadDropzone,
  useUploadThing,
} from "~/utils/uploadthing";

export default function Home() {
  const { startUpload } = useUploadThing("videoAndImage", {
    /**
     * @see https://docs.uploadthing.com/api-reference/react#useuploadthing
     */
    onClientUploadComplete: () => {
      alert("Upload Completed");
    },
  });

  return (
    <main>
      <div className="flex justify-center">
        <UploadDropzone
          /**
           * @see https://docs.uploadthing.com/api-reference/react#uploaddropzone
           */
          endpoint="videoAndImage"
          onClientUploadComplete={(res) => {
            console.log(`onClientUploadComplete`, res);
            alert("Upload Completed");
          }}
          onUploadBegin={() => {
            console.log("upload begin");
          }}
        />
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            // Do something with files

            // Then start the upload
            await startUpload([file]);
          }}
        />
      </div>
    </main>
  );
}
