import axios from "axios";
import { useState } from "react";

export default function CallbackPromiseAsyncAwaitPage() {
    const [myCallback, setMyCallback] = useState([]);
    const [myPromise, setMyPromise] = useState([]);
    const [myAsyncAwait, setMyAsyncAwait] = useState([]);

    function onClickCallback() {
        const ccc = new XMLHttpRequest();
        ccc.open("get", "http://numbersapi.com/random?min=1&max=200");
        ccc.send();
        ccc.addEventListener("load", (res: any) => {
            const num = res.target.response.split(" ")[0];

            const aaa = new XMLHttpRequest();
            aaa.open("get", `http://koreanjson.com/posts/${num}`);
            aaa.send();
            aaa.addEventListener("load", (res: any) => {
                const userId = JSON.parse(res.target.response).UserId;

                const aaa2 = new XMLHttpRequest();
                // prettier-ignore
                aaa2.open("get", `http://koreanjson.com/posts?userId=${userId}`);
                aaa2.send();
                aaa2.addEventListener("load", (res: any) => {
                    const result = JSON.parse(res.target.response);
                    setMyCallback(result);
                });
            });
        });
    }

    // new Promise((resolve, reject) => {
    //    외부에 요청하기 또는 비동기작업하기
    //    if(성공) resolve()
    //    if(실패) reject()
    // });

    function onClickPromise() {
        console.log("이것은 1번입니다."); // 1번시작
        axios
            .get("http://numbersapi.com/random?min=1&max=200")
            .then((res) => {
                console.log("이것은 3번입니다."); // 3번시작
                const num = res.data.split(" ")[0];
                return axios.get(`http://koreanjson.com/posts/${num}`);
            })
            .then((res) => {
                const userId = res.data.UserId;
                // prettier-ignore
                return axios.get(`http://koreanjson.com/posts?userId=${userId}`)
            })
            .then((res) => {
                setMyPromise(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("이것은 2번입니다."); // 2번시작
    }

    async function onClickAsyncAwait() {
        const res1 = await axios.get(
            "http://numbersapi.com/random?min=1&max=200"
        );
        const num = res1.data.split(" ")[0];

        const res2 = await axios.get(`http://koreanjson.com/posts/${num}`);
        const userId = res2.data.UserId;

        const res3 = await axios.get(
            `http://koreanjson.com/posts?userId=${userId}`
        );
        setMyAsyncAwait(res3.data);

        // Promise.all
        // const a = await axios.get("http://numbersapi.com/random?min=1&max=50")
        // const b = await axios.get("http://numbersapi.com/random?min=51&max=100")
        // const c = await axios.get("http://numbersapi.com/random?min=101&max=150")
    }

    return (
        <>
            <h1>콜백과 친구들</h1>
            <div>
                결과:
                {myCallback.map((el: any) => (
                    <div key={el.title}>{el.title}</div>
                ))}
            </div>
            <button onClick={onClickCallback}>Callback 요청하기!!</button>
            <div>
                결과:
                {myPromise.map((el: any) => (
                    <div key={el.title}>{el.title}</div>
                ))}
            </div>
            <button onClick={onClickPromise}>Promise 요청하기!!</button>
            <div>
                결과:
                {myAsyncAwait.map((el: any) => (
                    <div key={el.title}>{el.title}</div>
                ))}
            </div>
            <button onClick={onClickAsyncAwait}>AsyncAwait 요청하기!!</button>
        </>
    );
}
