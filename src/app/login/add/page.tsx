//ログイン画面

"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postLogin = async (email: string | undefined, name: string | undefined, password: string | undefined) => {
    const res = await fetch(`http://localhost:3000/api/login`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ email, name, password }),
});

return res.json();
};

const PostLogin= () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        toast.loading("ログイン中です・・・",{ id: "1" });
        await postLogin(
            emailRef.current?.value, 
            nameRef.current?.value, 
            passwordRef.current?.value);

        toast.success("ログインに成功しました！",{ id: "1" });

        router.push("/");
        router.refresh();
    };

    return (
    <>
    <Toaster />
    <div className="background-slate-100"></div>
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-100 font-bold p-3  bg-green-500 ">ログイン💡</p>
        <form onSubmit={handleSubmit}>

    <input ref={emailRef} 
    placeholder="メールアドレスを入力" 
    type="text" 
    className="rounded-md px-4 w-full py-5 my-2"
    />
    <input ref={nameRef} 
    placeholder="名前を入力" 
    type="text" 
    className="rounded-md px-4 w-full py-5 my-2"
    />
    <input ref={passwordRef} 
    placeholder="パスワードを入力" 
    type="text" 
    className="rounded-md px-4 w-full py-5 my-2"
    />
    <button className="float-end font-semibold px-7 py-2 shadow-xl bg-blue-400 rounded-lg hover:bg-blue-500">
    ログイン
    </button>
    </form>
    </div>
    </div>
    </>
    );
}

export default PostLogin;