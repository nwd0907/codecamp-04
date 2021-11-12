import { ChangeEvent, MouseEvent } from "react";

export interface IBoardWriteProps {
  isEdit?: boolean
  data?: any
}

export interface IMyUpdateBoardInput {
  title?: string;
  contents?: string;
}

export interface IBoardWriteUIProps {
  myWriterError: string
  myPasswordError: string
  myTitleError: string
  myContentsError: string
  onChangeMyWriter: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMyPassword: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMyTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMyContents: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onClickSubmit: (event: MouseEvent<HTMLButtonElement>) => void
  onClickUpdate: (event: MouseEvent<HTMLButtonElement>) => void
  isActive: boolean
  isEdit?: boolean
}

export interface ISubmitButtonProps {
  isActive: boolean
}