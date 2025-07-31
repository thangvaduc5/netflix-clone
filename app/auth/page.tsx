"use client"
import axios from "axios";
import Input from "@/components/input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub} from "react-icons/fa"

const Auth = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => 
            currentVariant === "login" ? "register" : "login");
    },[]);


    const login = useCallback(async() => {
        try {
            await signIn("credentials", {
                email,
                password,
                // redirect: false,
                callbackUrl: "/profiles"
            });
        } catch (error) {
            console.log(error);
        }
    }, [email, password])

    const register = useCallback(async() => {
        try {
            await axios.post("/api/register", {
                email,
                name,
                password
            });

            login(); 
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover ">
            <div className="bg-black w-full h-full lg:bg-black/50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-20"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
                        <h2 className="text-white font-bold mb-8 text-4xl">
                            {variant === "login" ? "Đăng nhập" : "Đăng ký"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {
                                variant === "register" && (
                                    <Input
                                        label="Tên tài khoản"
                                        onChange={(ev) => {setName(ev.target.value)}}
                                        id="name"
                                        value={name}
                                    />
                                )
                            }
                            <Input
                                label="Email"
                                onChange={(ev) => {setEmail(ev.target.value)}}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Mật khẩu"
                                onChange={(ev) => {setPassword(ev.target.value)}}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 cursor-pointer hover:bg-red-700 transition">
                            {variant === "login" ? "Đăng nhập" : "Đăng ký"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            >
                                <FcGoogle size={30}/>
                            </div>
                             <div
                                onClick={() => signIn('github', {callbackUrl: '/profiles'})}
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            >
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "Bạn mới sử dụng Netflix?" : "Bạn đã có tài khoản Netflix?"}
                            <span onClick={toggleVariant} className="font-semibold text-white ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Đăng ký ngay" : "Đăng nhập"}
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth