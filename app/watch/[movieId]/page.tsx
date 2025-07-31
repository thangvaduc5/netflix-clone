"use client"
import React, { useEffect, useState, useRef } from "react";
import useMovie from "@/hooks/useMovie";
import { FaArrowLeft } from "react-icons/fa6";

import { useParams, useRouter } from "next/navigation";

const Watch = () => {
    const params = useParams();
    const router = useRouter();
    const { movieId } = params;
    
    const { data } = useMovie(movieId as string);

    // State để kiểm soát việc hiển thị của nav
    const [showNav, setShowNav] = useState(true);
    // Ref để lưu trữ timeout ID, giúp clear timeout khi component unmount hoặc trạng thái thay đổi
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Hàm để ẩn nav sau một khoảng thời gian
    const hideNavAutomatically = (milisecond: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setShowNav(false);
        }, milisecond); // Ẩn sau 3 giây
    };

    // Khi component mount, hiển thị nav và sau đó ẩn đi
    useEffect(() => {
        hideNavAutomatically(3000);

        // Clear timeout khi component unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []); // Chạy một lần khi mount

    // Xử lý khi chuột di chuyển vào khu vực nav
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Xóa timeout hiện có để giữ nav hiển thị
        }
        setShowNav(true); // Đảm bảo nav hiển thị
    };

    // Xử lý khi chuột rời khỏi khu vực nav
    const handleMouseLeave = () => {
        hideNavAutomatically(1000); // Bắt đầu lại quá trình ẩn tự động
    };

    if (!data) {
        return null; // Hoặc hiển thị một loading spinner
    }

    return (
        <div className="h-screen w-screen bg-black relative">
            {/* Thêm các event handlers vào nav */}
            <nav
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`
                    fixed
                    w-full
                    p-4
                    z-10
                    flex
                    flex-row
                    items-center
                    gap-8
                    bg-black/70
                    transition-all duration-500 ease-in-out
                    ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0'}
                `}
            >
                <FaArrowLeft 
                    onClick={() => router.push("/")} 
                    className="text-white cursor-pointer hover:opacity-80 transition" 
                    size={30} 
                />
                <p className="text-white text-xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video
                autoPlay
                controls
                className="h-full w-full"
                src={data?.videoUrl}
            ></video>
        </div>
    );
};

export default Watch;