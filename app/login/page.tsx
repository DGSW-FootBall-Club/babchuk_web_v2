import logo from "../../public/logo.svg";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
            <Image
                src={logo}
                alt="Logo"
                width={160}
                height={160}
                className="mb-8 h-32 w-32 sm:h-40 sm:w-40"
            />
            {/** 로그인 */}
            <LoginForm />
        </main>
    );
}
