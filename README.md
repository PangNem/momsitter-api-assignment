# momsitter-api-assignment

맘시터 인터뷰 전 사전과제 입니다.

원래 기능 구현 후 제출하였으나, 제출 후에도 리팩토링 및 유닛 테스트 코드 추가 과정을 진행하였습니다.

## 요구사항

[파일](./docs/momsitter.md)

## 폴더 구조

    .
    ├── docs # 문서 파일
    ├── src
      ├── auth # 인증 및 인가(회원가입, 로그인) 처리 부분
      ├── config # 설정 파일들 관리하는 곳
      ├── parent
      ├── sitter
      ├── user
      ├── app.module.ts
      └── main.ts
    ├── test # e2e 테스트 코드 파일, 현재는 비어있음
    ├── .http # vscode http client 테스트 파일
    └── README.md

## 실행

본인의 컴퓨터에 mysql 서버가 실행되어야 합니다.

다음 명령어를 통해 서버를 실행합니다.

```
yarn start
```

다음 명령어를 통해 테스트 코드를 실행합니다. (유닛테스트)

```
yarn test
```
