import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

export default function ImageUploadPage() {
  const [myWriter, setMyWriter] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [myContents, setMyContents] = useState("");
  const [myImages, setMyImages] = useState<string[]>([]);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  function onChangeMyWriter(event: ChangeEvent<HTMLInputElement>) {
    setMyWriter(event.target.value);
  }

  function onChangeMyPassword(event: ChangeEvent<HTMLInputElement>) {
    setMyPassword(event.target.value);
  }

  function onChangeMyTitle(event: ChangeEvent<HTMLInputElement>) {
    setMyTitle(event.target.value);
  }

  function onChangeMyContents(event: ChangeEvent<HTMLInputElement>) {
    setMyContents(event.target.value);
  }

  async function onClickSubmit() {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: myWriter,
            password: myPassword,
            title: myTitle,
            contents: myContents,
            images: myImages,
          },
        },
      });
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  }

  async function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
    const myFile = event.target.files?.[0];
    console.log(myFile);

    if (!myFile?.size) {
      alert("????????? ????????????!");
      return;
    }

    if (myFile.size > 5 * 1024 * 1024) {
      alert("?????? ????????? ?????? ?????????.(??????: 5MB)");
      return;
    }

    if (!myFile.type.includes("jpeg") && !myFile.type.includes("png")) {
      alert("jpeg ?????? png??? ????????? ???????????????!!!");
      return;
    }

    try {
      const result = await uploadFile({
        variables: {
          file: myFile,
        },
      });
      console.log(result.data?.uploadFile.url);
      if (!result.data) throw new Error("???????????? ??????????????????.");

      setMyImages([result.data?.uploadFile.url]);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <h1>????????? ?????????!!!</h1>
      <input type="file" onChange={onChangeFile} />
      <br />
      ?????????: <input type="text" onChange={onChangeMyWriter} />
      <br />
      ????????????: <input type="password" onChange={onChangeMyPassword} />
      <br />
      ??????: <input type="text" onChange={onChangeMyTitle} />
      <br />
      ??????: <input type="text" onChange={onChangeMyContents} />
      <br />
      <button onClick={onClickSubmit}>????????????</button>
    </>
  );
}
