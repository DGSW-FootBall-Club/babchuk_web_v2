# Babchuk Web v2

## 1. 프로젝트 개요

Babchuk Web v2는 축구 매치 생성, 조회, 신청 기능을 제공하는 웹 서비스입니다. 현재 매치 화면은 mock 데이터를 사용하며, `NEXT_PUBLIC_API_URL`이 설정되면 매치 API를 호출합니다. 프로필과 매치 참가 이력은 타입으로 정의되어 있으며, 프로필 API는 아직 연결되어 있지 않습니다.

주요 기능:

- 로그인
- 홈 화면
- 매치 생성
- 매치 목록 조회
- 매치 상세 조회
- 일정별 카드 확인
- 매치 신청 상태 표시

주요 화면:

- `/` : 홈
- `/login` : 로그인
- `/match` : 매치 목록
- `/match/create` : 매치 생성
- `/match/[id]` : 매치 상세
- `/history` : 히스토리

---

## 2. 기능 명세서

### 2.1 로그인

- 사용자는 사용자 이름(username) 기반으로 로그인을 수행할 수 있어야 한다.
- 로그인 성공 시 사용자 정보를 세션/토큰에 저장한다.
- 현재 프론트는 로그인 폼 UI만 있고, 서버 연결은 아직 비활성화 상태이다.

필수 정보:

- username
- name

기대 동작:

- 로그인 성공 시 홈으로 이동
- 로그인 실패 시 에러 메시지 표시

---

### 2.2 홈 화면

홈 화면은 다음 영역으로 구성된다.

1. 매치 생성 카드
2. 매치 보기 카드
3. 다가오는 일정 카드 목록
4. 히스토리 카드

기대 동작:

- 다가오는 일정은 최근/임박 매치 3개를 표시한다.
- 카드 클릭 시 `/match/{id}`로 이동한다.
- 상태에 따라 배지 표시
    - `pending` → 신청 가능
    - `full` → 마감

---

### 2.3 매치 생성

사용자는 새 매치를 생성할 수 있어야 한다.

필수 입력 값:

- matchName: 매치명
- maxPlayers: 최대 인원
- date: 날짜
- time: 시간
- authorName: 작성자 이름
- authorUsername: 작성자 사용자 이름

기본 규칙:

- 제목은 비어 있을 수 없다.
- 최대 인원은 2 이상이어야 한다.
- 날짜와 시간이 모두 있어야 한다.
- 작성자 이름과 사용자 이름은 필수다.

생성 시 서버로 전달되는 payload:

```json
{
    "title": "주말 축구 매치",
    "maxPlayers": 10,
    "startAt": "2026-10-03T18:00",
    "author": {
        "name": "민수",
        "username": "minsu"
    }
}
```

성공 시:

- 매치 생성 후 `/match`로 이동
- 성공 메시지 표시

---

### 2.4 매치 목록

목록 페이지는 등록된 매치들을 카드 형태로 보여준다.

표시 항목:

- 매치 제목
- 날짜 및 시간
- 현재 인원 / 최대 인원
- 상태 배지
- 작성자 이름

정렬 규칙:

- 가장 가까운 일자 순으로 정렬 권장
- 상태 값은 프론트에서 표시용으로 계산 가능

---

### 2.5 매치 상세

매치 상세 페이지는 다음 정보를 표시한다.

- 타이틀
- 날짜
- 시간
- 현재 인원 / 최대 인원
- 상태 (`pending`, `full`)
- 참여자 목록
- 팀별 구분 (`A`, `B`)

상태 규칙:

- `pending` → 신청 가능 버튼 활성화
- `full` → 신청 마감 버튼 비활성화

참여자 표시 규칙:

- 참여자는 A팀 / B팀으로 나눠서 좌우에 각각 표시
- 사용자 데이터 구조는 아래와 같다.

---

### 2.6 매치 신청

현재 프론트 구현은 상태 표시 및 렌더링 중심이며, 실제 신청 로직은 서버에서 처리한다.

필수 규칙:

- 이미 마감(`full`)인 매치는 신청 불가
- 신청 시 해당 사용자 현재 인원 수 증가
- 팀 배정은 A / B 중 하나로 할당
- 신청자가 중복으로 들어오면 처리 방지

---

### 2.7 히스토리

- 과거 참여/생성 기록을 표시하는 페이지
- 현재는 UI placeholder 형태이며, 서버 연결 시 실제 데이터로 교체

---

## 3. 데이터 모델

### 3.1 User

```ts
export type TeamType = "A" | "B";

export type Profile = {
    userId: string;
    username: string;
    name: string;
    participatedMatchIds: string[];
    currentMatchIds: string[];
    profileImage: string | null;
};

export type User = {
    id?: string;
    userId?: string;
    username: string;
    name: string;
    team?: TeamType;
    profileImage?: string | null;
    currentMatchIds?: string[];
    participatedMatchIds?: string[];
    joinedMatchIds?: string[];
};
```

설명:

- `userId`: 사용자 고유 ID (`Profile`에서 필수)
- `username`: 사용자 식별용 이름
- `name`: 사용자 이름
- `participatedMatchIds`: 참가 완료한 매치 ID 목록
- `currentMatchIds`: 현재 참가 중인 매치 ID 목록
- `profileImage`: 프로필 이미지 URL. 이미지가 없으면 `null`
- `team`: 매치 내부 팀 구분, 값은 `A` 또는 `B`

매치 작성자 및 참여자는 `User` 형태로 전달한다. 매치 참가 이력과 프로필 상세 정보는 `Profile`에 정의되어 있고, 매치 API 응답에 해당 데이터가 포함되는지는 서버 계약에 따라야 한다.

### 3.2 Match

```ts
export type MatchStatus = "pending" | "full";

export type Match = {
    id: string;
    title: string;
    maxPlayers: number;
    currentPlayers: number;
    status: MatchStatus;
    date: string;
    time: string;
    author: User;
    users: User[];
};
```

설명:

- `currentPlayers`는 현재 참여 인원 수
- `status`는 매칭 상태
- `author`는 매치를 생성한 사람
- `users`는 참여자 목록

### 3.3 Match 생성 payload

```ts
export type CreateMatchPayload = {
    title: string;
    maxPlayers: number;
    startAt: string;
    author: User;
};
```

주의:

- `startAt`은 ISO 문자열 포맷으로 전달한다.
- 예: `2026-10-03T18:00`

---

## 4. API 명세서

기본 정보를 확인할 때는 아래 규칙을 따른다.

- Base URL: `process.env.NEXT_PUBLIC_API_URL`
- Content-Type: `application/json`
- 인증: 현재는 쿠키 기반 `credentials: "include"` 구조를 기대한다.

### 4.1 GET /matches

매치 목록 조회

요청:

```http
GET /matches
```

응답 예시:

```json
[
    {
        "id": "1",
        "title": "주말 축구 매치",
        "maxPlayers": 10,
        "currentPlayers": 7,
        "status": "pending",
        "date": "2026-10-03",
        "time": "18:00",
        "author": {
            "name": "민수",
            "username": "minsu"
        },
        "users": [
            { "name": "민수", "username": "minsu", "team": "A" },
            { "name": "지우", "username": "jiwoo", "team": "A" },
            { "name": "태준", "username": "taejun", "team": "B" }
        ]
    }
]
```

성공 코드:

- 200 OK

---

### 4.2 GET /matches/:id

단일 매치 조회

요청:

```http
GET /matches/1
```

응답 예시:

```json
{
    "id": "1",
    "title": "주말 축구 매치",
    "maxPlayers": 10,
    "currentPlayers": 7,
    "status": "pending",
    "date": "2026-10-03",
    "time": "18:00",
    "author": {
        "name": "민수",
        "username": "minsu"
    },
    "users": [
        { "name": "민수", "username": "minsu", "team": "A" },
        { "name": "지우", "username": "jiwoo", "team": "A" },
        { "name": "태준", "username": "taejun", "team": "B" }
    ]
}
```

오류:

- 404 Not Found: 존재하지 않는 매치 ID

---

### 4.3 POST /matches

매치 생성

요청 본문:

```json
{
    "title": "주말 축구 매치",
    "maxPlayers": 10,
    "startAt": "2026-10-03T18:00",
    "author": {
        "name": "민수",
        "username": "minsu"
    }
}
```

응답 예시:

```json
{
    "id": "1",
    "title": "주말 축구 매치",
    "maxPlayers": 10,
    "currentPlayers": 1,
    "status": "pending",
    "date": "2026-10-03",
    "time": "18:00",
    "author": {
        "name": "민수",
        "username": "minsu"
    },
    "users": [{ "name": "민수", "username": "minsu", "team": "A" }]
}
```

성공 코드:

- 201 Created

오류:

- 400 Bad Request: 입력 값 누락/유효성 검증 실패
- 401 Unauthorized: 로그인 필요

---

### 4.4 POST /matches/:id/join

매치 신청

요청:

```http
POST /matches/1/join
```

요청 본문:

```json
{
    "user": {
        "name": "홍길동",
        "username": "hong"
    }
}
```

처리 규칙:

- `status === "full"`이면 409 Conflict 반환
- 사용자가 이미 신청한 경우 중복 방지
- 팀 배정은 서버에서 `A` 또는 `B`로 자동 할당

성공 응답:

```json
{
    "id": "1",
    "currentPlayers": 8,
    "status": "pending"
}
```

---

### 4.5 공통 에러 응답

```json
{
    "message": "요청 실패",
    "error": "BAD_REQUEST"
}
```

공통 상태 코드:

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

---

## 5. 구현 우선순위

1. 사용자/매치 데이터 모델 정의
2. 매치 생성 API
3. 매치 목록 API
4. 매치 상세 API
5. 팀 배정 로직
6. 신청 로직
7. 상태 계산 로직 (`pending` / `full`)
8. 로그인/인증

---

## 6. 참고사항

- 현재 프론트는 mock 데이터 기반으로 동작 중이므로, 서버가 준비되면 `lib/api/match.ts`의 fetch 로직만 실제 API에 맞게 연결하면 된다.
- `startAt`을 `date` + `time`으로 조합하는 로직을 서버에서도 동일하게 맞춰야 한다.
- A/B 팀 배정은 필수 데이터이며 UI는 좌우 컬럼으로 표시한다.
- 현재 데이터는 `team` 값이 없을 수 있지만, 서버는 팀 배정을 보장하도록 구현해야 한다.

---

## 7. 서버 담당자가 꼭 맞춰야 하는 핵심 규칙

- `status`는 항상 `pending` 또는 `full`로 관리
- `currentPlayers`는 실제 참여 인원 수와 일치해야 함
- `maxPlayers` 도달 시 바로 `full`로 전환
- `A, B` 팀은 사용자별로 분배되며 UI 기준으로 좌우로 표시
- 응답 DTO는 프론트의 타입 구조와 동일해야 함

이 문서를 기준으로 서버 API를 구현하면 프론트와 데이터 구조가 맞아 동작한다.
