import type { Match } from "@/types/match.type";
import type { User } from "@/types/user.type";

export const mockUsers: User[] = [
    { id: "u1", name: "민수", username: "minsu", team: "A" },
    { id: "u2", name: "지우", username: "jiwoo", team: "A" },
    { id: "u3", name: "현우", username: "hyunwoo", team: "A" },
    { id: "u4", name: "서윤", username: "seoyun", team: "A" },
    { id: "u5", name: "태준", username: "taejun", team: "B" },
    { id: "u6", name: "예린", username: "yerin", team: "B" },
    { id: "u7", name: "동현", username: "donghyun", team: "B" },
    { id: "u8", name: "준호", username: "junho", team: "A" },
    { id: "u9", name: "하린", username: "harin", team: "A" },
    { id: "u10", name: "시온", username: "sion", team: "B" },
    { id: "u11", name: "도윤", username: "doyun", team: "B" },
    { id: "u12", name: "유진", username: "yujin", team: "B" },
    { id: "u13", name: "재민", username: "jaemin", team: "A" },
    { id: "u14", name: "강우", username: "kangwoo", team: "A" },
    { id: "u15", name: "나경", username: "nakyung", team: "B" },
];

export const mockMatches: Match[] = [
    {
        id: "1",
        title: "주말 축구 매치",
        maxPlayers: 10,
        currentPlayers: 7,
        status: "pending",
        date: "2026-10-03",
        time: "18:00",
        author: { name: "민수", username: "minsu" },
        users: [
            mockUsers[0],
            mockUsers[1],
            mockUsers[2],
            mockUsers[3],
            mockUsers[4],
            mockUsers[5],
            mockUsers[6],
        ],
    },
    {
        id: "2",
        title: "친구끼리 풋살",
        maxPlayers: 8,
        currentPlayers: 8,
        status: "full",
        date: "2026-10-05",
        time: "20:30",
        author: { name: "준호", username: "junho" },
        users: [
            mockUsers[7],
            mockUsers[8],
            mockUsers[9],
            mockUsers[10],
            mockUsers[11],
            mockUsers[12],
            mockUsers[13],
            mockUsers[14],
        ],
    },
    {
        id: "3",
        title: "평일 저녁 풋살",
        maxPlayers: 12,
        currentPlayers: 5,
        status: "pending",
        date: "2026-10-07",
        time: "19:00",
        author: { name: "예린", username: "yerin" },
        users: [
            { name: "예린", username: "yerin", team: "A" },
            { name: "민수", username: "minsu", team: "A" },
            { name: "도윤", username: "doyun", team: "B" },
            { name: "재민", username: "jaemin", team: "A" },
            { name: "하린", username: "harin", team: "B" },
        ],
    },
];

export const mockMatchList = mockMatches;
