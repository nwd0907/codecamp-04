import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { Global } from "@emotion/react";
import "antd/dist/antd.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { createUploadLink } from "apollo-upload-client";
// import Head from "next/head";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVlehebGH9EilvdWjqx2W1KAkl-UBI2TY",
  authDomain: "codecamp-aa4c2.firebaseapp.com",
  projectId: "codecamp-aa4c2",
  storageBucket: "codecamp-aa4c2.appspot.com",
  messagingSenderId: "434605305014",
  appId: "1:434605305014:web:1674564dbd239a21124a17",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  userInfo?: {
    name?: string;
    email?: string;
    picture?: string;
  };
  setUserInfo?: Dispatch<SetStateAction<{}>>;
}
export const GlobalContext = createContext<IGlobalContext>({});
function MyApp({ Component, pageProps }: AppProps) {
  const [myAccessToken, setMyAccessToken] = useState("");
  const [myUserInfo, setMyUserInfo] = useState({});
  const myValue = {
    accessToken: myAccessToken,
    setAccessToken: setMyAccessToken,
    userInfo: myUserInfo,
    setUserInfo: setMyUserInfo,
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (accessToken) setMyAccessToken(accessToken);
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend04.codebootcamp.co.kr/graphql",
    headers: { authorization: `Bearer ${myAccessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  return (
    <>
      {/* <Head> 모든 페이지에서 카카오맵을 다운로드 받으므로 비효율적임
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=bd32674f73acffb55599616a9c966a1c"
        ></script>
      </Head> */}
      <GlobalContext.Provider value={myValue}>
        <ApolloProvider client={client}>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default MyApp;
