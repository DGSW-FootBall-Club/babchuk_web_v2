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
- 프로필 경기 기록 및 승·패·무 전적
- 방장 경기 결과 입력 및 방장 왕관 표시

주요 화면:

- `/` : 홈
- `/login` : 로그인
- `/match` : 매치 목록
- `/match/create` : 매치 생성
- `/match/[id]` : 매치 상세
- `/history` : 히스토리

---

## 2. 기능 명세서

### 2.1 로그인.

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
- 최대 인원은 2명 이상 24명 이하여야 한다. 서버에서도 같은 제한을 검증해야 한다.
- 날짜와 시간이 모두 있어야 한다.
- 로그인한 프로필을 매치 작성자로 사용한다. 비로그인 사용자는 `/match/create`에 접근할 수 없으며 `/login`으로 이동한다.
- 빠른 시간 선택은 점축 `13:05`, 저축 `18:40`이며, 직접 다른 시간도 선택할 수 있다.

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

- 매치 생성 후 홈(`/`)으로 이동
- 성공 메시지 표시

---

### 2.4 매치 목록

목록 페이지는 등록된 매치들을 카드 형태로 보여준다.

- 로그인 없이 접근할 수 있다.

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
- 목록 및 상세 조회는 로그인 없이 접근할 수 있다.

참여자 표시 규칙:

- 참여자는 A팀 / B팀으로 나눠서 좌우에 각각 표시
- 사용자 데이터 구조는 아래와 같다.

---

### 2.6 매치 신청

프론트는 로그인한 프로필로 신청 요청을 보내고, 성공 후 매치 정보를 다시 조회한다. 중복 신청 및 팀 배정은 서버에서 검증하고 처리한다.

필수 규칙:

- 참가 신청은 로그인해야 할 수 있다.
- 이미 마감(`full`)인 매치는 신청 불가
- 신청 시 해당 사용자 현재 인원 수 증가
- 팀 배정은 A / B 중 하나로 할당
- 신청자가 중복으로 들어오면 처리 방지
- 신청 요청 성공 즉시 참가 버튼을 비활성화하고 매치 상세 데이터를 다시 조회한다.

---

### 2.7 작성자 매치 관리

- 매치 작성자만 상세 화면에서 매치 수정·삭제, 신청 잠금/해제, 팀 셔플을 할 수 있다.
- 작성자 권한은 화면 표시뿐 아니라 각 관리 API에서도 서버가 검증해야 한다.
- 수정 항목은 매치 이름, 최대 인원, 날짜, 시간이다. 최대 인원은 2~24명이어야 하고 현재 참가 인원보다 작을 수 없다.
- 수정 시간은 빠른 선택 점축 `13:05`, 저축 `18:40` 또는 직접 입력으로 지정한다.
- 삭제는 확인 후 진행하며, 성공하면 매치 목록으로 이동한다.

### 2.8 경기 결과 및 전적

- 경기에 참여한 사용자는 프로필에서 `참가 중인 경기`와 `참가한 경기`를 확인할 수 있다.
- 결과가 아직 없는 경기는 `currentMatches`에, 결과가 등록된 경기는 `participatedMatches`에 표시한다.
- 경기 상세에서 방장에게만 경기 결과 입력 영역을 표시한다.
- 방장은 결과를 `A팀 승리`, `B팀 승리`, `무승부` 중 선택할 수 있고, 잘못 입력한 결과는 초기화하거나 다른 결과로 수정할 수 있다.
- 개인 승·패·무는 매치의 `users` 배열에서 본인의 팀을 확인해 경기 결과로부터 서버가 계산한다.
    - 결과가 `A_WIN`이면 A팀 참여자는 승리, B팀 참여자는 패배
    - 결과가 `B_WIN`이면 B팀 참여자는 승리, A팀 참여자는 패배
    - 결과가 `DRAW`이면 양 팀 참여자 모두 무승부
- 결과가 등록되지 않은 경기는 승·패·무 통계에 포함하지 않는다. 결과 등록/수정/초기화 후 프로필 기록과 통계를 다시 계산한다.
- 방장은 매치 상세의 이름 옆에 황금 왕관으로 표시한다. 이 표시는 `match.author`에서 판별하며, 클라이언트가 임의로 방장을 정하지 않는다.

### 2.9 히스토리

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
    result?: "A_WIN" | "B_WIN" | "DRAW" | null;
    date: string;
    time: string;
    author: MatchUser;
    users: MatchUser[];
};
```

`result`는 완료된 매치의 팀 결과이며, 기록이 없으면 `null`이다. 실제 API 응답에서는 이 필드를 포함하도록 서버에 반영해야 한다.

내 경기 기록 응답:

```ts
export type MyMatchHistory = {
    currentMatches: Match[];
    participatedMatches: Match[];
    stats: {
        wins: number;
        losses: number;
        draws: number;
    };
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
- 매치 상세 응답에 `result` 필드를 제공해야 한다. 방장 표시는 매치 응답의 `author`와 비교해 렌더링하며, 승·패·무 계산은 서버가 수행한다.
- 매치 생성 경로는 프로필 API로 로그인 상태를 확인하고, 비로그인 사용자는 `/login`으로 보낸다. 매치 목록과 상세 조회는 공개 상태를 유지한다.
- 생성 및 수정 폼에서 최대 인원 24명 상한을 검사한다. 백엔드에서도 2~24명 제한과 현재 참가 인원보다 작게 줄일 수 없는 규칙을 강제해야 한다.
- 참가 신청 성공 직후 참가 버튼을 비활성화하고 매치 상세 데이터를 다시 조회한다. 매치 생성 성공 후에는 홈(`/`)으로 이동한다.
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
- `maxPlayers`는 2~24명 범위로 제한
- `maxPlayers` 도달 시 바로 `full`로 전환
- 매치 결과는 방장만 입력·수정·초기화 가능
- 개인 승·패·무는 참여 당시 팀과 매치 결과로 계산하며, 미등록 결과는 전적에서 제외
- 결과가 등록된 매치는 참가 신청을 거부하고 참가 버튼도 비활성화
- `A, B` 팀은 사용자별로 분배되며 UI 기준으로 좌우로 표시
- 응답 DTO는 프론트의 타입 구조와 동일해야 함

이 문서를 기준으로 서버 API를 구현하면 프론트와 데이터 구조가 맞아 동작한다.
