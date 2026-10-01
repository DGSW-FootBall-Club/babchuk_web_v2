import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
    return (
        <header className="sticky top-0 z-50 h-16 w-full bg-white shadow-sm sm:h-20">
            <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
                <div />
                <div className="flex justify-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={140}
                        height={48}
                        className="h-9 w-auto sm:h-12"
                    />
                </div>
                <nav className="flex justify-end gap-4 text-sm font-bold sm:text-base">
                    <Link href="/login">
                        <button type="button" className="cursor-pointer">
                            로그인
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
