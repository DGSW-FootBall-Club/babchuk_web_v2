import logo from "@/public/logo.svg";
import Image from "next/image";

export default function Topbar() {
    return (
        <header className="grid h-20 w-full grid-cols-3 items-center px-24">
            <div />
            <div className="flex justify-center">
                <Image
                    src={logo}
                    alt="Logo"
                    width={140}
                    height={48}
                    className="h-12 w-auto"
                />
            </div>
            <nav className="flex justify-end gap-4 text-lg font-bold">
                <button type="button" className="cursor-pointer">
                    로그인
                </button>
                <button type="button" className="cursor-pointer">
                    회원가입
                </button>
            </nav>
        </header>
    );
}
