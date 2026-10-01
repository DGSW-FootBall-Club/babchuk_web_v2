import logo from "../../public/logo.svg";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-24">
            <Image
                src={logo}
                alt="Logo"
                width={200}
                height={200}
                className="mb-8"
            />
            {/** 로그인 */}
            <LoginForm />
        </div>
    );
}
