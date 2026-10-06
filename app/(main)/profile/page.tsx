import { useProfileStore } from "@/stores/profileStore";
import Image from "next/image";

export default function Profile() {
    const { profile } = useProfileStore();

    if (!profile) {
        return <div>프로필을 불러오는 중입니다..</div>;
    }

    return (
        <section>
            <div>
                {profile.profileImage && (
                    <Image
                        src={profile.profileImage}
                        alt="프로필 이미지입니다."
                        width={100}
                        height={100}
                    />
                )}
                <div>
                    <p>{profile.username}</p>
                    <p>{profile.name}</p>
                </div>
            </div>
        </section>
    );
}
