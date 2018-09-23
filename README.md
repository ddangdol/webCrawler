# NodeJS로 경량 크롤러 만들기
## 제약조건
* Node JS 네이티브 전체 사용가능
* 외부패키지 : axios 허용
## 조건
* http://newspeppermint.com 3페이지까지 수집을 합니다.
* 수집된 데이터의 형식은 다음 JSON 구조를 따릅니다. (아래 URL을 예시로 내용을 보시면 됩니다.)
```json
[
    {
        url: "http://newspeppermint.com/2018/09/11/world-not-bad/",
        writer: "jisukim",
        date: "2018-09-12",
        category: ["IT", "칼럼"]
    },
    ....
]
```
* 순서대로 수집할 필요는 없지만, 3페이지까지 빠진 내용이 있으면 안됩니다.
* 생성완료된 내용은 output.json 파일로 저장이 됩니다.
## 추가조건
* 다음 실행시, 이미 수집된 내용은 제외하고 새로운 글만 수집합니다.
* Non-Block을 활용해서 가능한한 빠르게 수집합니다.

## Requirements
* Node 10.11.0
* axios 0.18.0

## 설치방법
```shell
> npm install
```

## 실행방법
```shell
> npm start
```

## 결과확인
결과는 root에 output.json 파일로 저장된다.
