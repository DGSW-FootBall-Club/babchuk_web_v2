# Babchuk Web v2

## 1. 프로젝트 개요


로그인은 기존 도담도담 OAuth 인증을 사용합니다. 로그인한 사용자의 프로필은 `GET /auth/getme`로 조회합니다. `NEXT_PUBLIC_API_URL`이 없거나 서버 요청에 실패하면 화면에 오류를 표시하며, 샘플 데이터로 대신하지 않습니다.

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

- 사용자는 도담도담 OAuth 제공자를 통해 로그인한다.
- OAuth 인증 코드는 `/verify` 콜백에서 처리하고, 기존 OAuth 환경 변수와 PKCE 검증 흐름을 사용한다.
- 로그인 프로필은 `GET /auth/getme`로 조회한다.

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

- 매치 API에서 가져온 매치 중 최대 3개를 표시한다.
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

기본 규칙:

- 제목은 비어 있을 수 없다.
- 최대 인원은 2 이상이어야 한다.
- 날짜와 시간이 모두 있어야 한다.
- 로그인한 프로필을 매치 작성자로 사용한다.

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

프론트는 로그인한 프로필로 신청 요청을 보내고, 성공 후 매치 정보를 다시 조회한다. 중복 신청 및 팀 배정은 서버에서 검증하고 처리한다.

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
    participatedMatchIds?: string[];
    currentMatchIds?: string[];
    profileImage?: string | null;
};

export type UserRequest = {
    username: string;
    name: string;
};

export type MatchUser = UserRequest & {
    userId?: string;
    team?: TeamType;
    profileImage?: string | null;
};
```

설명:

- `userId`: 사용자 고유 ID (`Profile`에서 필수)
- `username`: 사용자 식별용 이름
- `name`: 사용자 이름
- `participatedMatchIds`: 참가 완료한 매치 ID 목록 (선택 필드)
- `currentMatchIds`: 현재 참가 중인 매치 ID 목록 (선택 필드)
- `profileImage`: 프로필 이미지 URL. 이미지가 없으면 `null`
- `team`: 매치 내부 팀 구분, 값은 `A` 또는 `B`

요청 본문에는 `UserRequest`를 사용하고, 매치 응답의 작성자와 참여자에는 `MatchUser`를 사용한다. 프로필 응답은 별도의 `Profile` 타입이다.

### 3.2 Match

```ts
export type MatchStatus = "pending" | "full";

export type Match = {
    id: string;
    title: string;
    maxPlayers: number;
    currentPlayers: number;
    status: MatchStatus;
    applicationLocked: boolean;
    date: string;
    time: string;
    author: MatchUser;
    users: MatchUser[];
};
```

설명:

- `currentPlayers`는 현재 참여 인원 수
- `status`는 정원 상태
- `applicationLocked`는 매치 작성자가 신청을 잠갔는지 여부
- `author`는 매치를 생성한 사람
- `users`는 참여자 목록

### 3.3 Match 생성 payload

```ts
export type CreateMatchPayload = {
    title: string;
    maxPlayers: number;
    startAt: string;
    author: UserRequest;
};
```

주의:

- 작성자 이름과 사용자 이름은 로그인한 사용자의 프로필과 일치해야 한다.

---

## 4. Server integration overview

- The application uses server APIs for match and profile data.
- Authentication and authorization must be enforced by the server.

## 5. 구현 개요

- 매치 목록, 상세, 생성, 참가 요청은 `lib/api/match.ts`에서 서버 API를 호출한다.
- 작성자 전용 잠금/셔플 UI도 `lib/api/match.ts`의 제안 API를 호출한다. 백엔드가 위 계약을 구현하기 전까지 해당 요청은 실패한다.
- 로그인, 로그아웃, 인증된 프로필 조회는 `lib/api/profile.ts`에서 처리한다.
- 공개 조회 요청은 로그인이나 토큰 갱신 없이 호출한다. 인증이 필요한 요청에서만 401 토큰 갱신을 시도한다.
- API 요청은 쿠키 인증을 위해 공통 `lib/api.ts`에서 `credentials: "include"`로 호출한다.
- `NEXT_PUBLIC_API_URL`은 서버 API의 base URL이며 끝의 `/`는 제거된다.
- 서버 API가 준비되지 않았거나 요청이 실패하면 로딩 오류를 표시하고 재시도할 수 있다. 개발용 mock fallback은 없다.

---

## 6. 참고사항

- 배포 환경에 `NEXT_PUBLIC_API_URL` 및 기존 도담도담 OAuth 환경 변수를 설정해야 한다.
- `startAt`을 `date` + `time`으로 조합하는 로직을 서버에서도 동일하게 맞춰야 한다.
- A/B 팀 배정은 필수 데이터이며 UI는 좌우 컬럼으로 표시한다.
- 서버는 매치 참가자의 `team` 값을 보장해야 한다.

---

## 7. 서버 담당자가 꼭 맞춰야 하는 핵심 규칙

- `status`는 항상 `pending` 또는 `full`로 관리
- `currentPlayers`는 실제 참여 인원 수와 일치해야 함
- `maxPlayers` 도달 시 바로 `full`로 전환
- `A, B` 팀은 사용자별로 분배되며 UI 기준으로 좌우로 표시
- 응답 DTO는 프론트의 타입 구조와 동일해야 함

이 문서를 기준으로 서버 API를 구현하면 프론트와 데이터 구조가 맞아 동작한다.
