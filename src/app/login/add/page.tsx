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
    <input ref={emailRef} 
    placeholder="タイトルを入力" 
    type="text" 
    className="rounded-md px-4 w-full py-2 my-2"
    />
    <input ref={nameRef} 
    placeholder="名前を入力" 
    type="text" 
    className="rounded-md px-4 w-full py-2 my-2"
    />
    <input ref={passwordRef} 
    placeholder="パスワードを入力" 
    type="text" 
    className="rounded-md px-4 w-full py-2 my-2"
    />
    </>
    );
}

export default PostLogin;