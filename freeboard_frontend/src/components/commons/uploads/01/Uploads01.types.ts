import { ChangeEvent, RefObject } from "react";

export interface IUploads01Props {
  index: number;
  fileUrl: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
}

export interface IUploads01UIProps {
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
  onClickUpload: () => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
