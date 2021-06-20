# json_to_html.js
json형식의 string을 파싱하여 html 태그로 변환하고, 특정 id값의 태그에 입력하는 Javascript 프로그램
```
<script type="text/javascript" src="https://artificial-lua.github.io/json_to_html.js/jsontohtml.js"></script>
```
위 코드를 html 내 삽입하여 사용할 수 있음

# rest(url, id)
url : String, 해당 주소로 접속하여 json 형식의 string을 받아옴  
id : 파싱된 json string을 해당 id값을 가진 html 태그 내부에 입력  
rest 함수 실행 시, 해당 id값을 가진 태그 내부는 초기화된 후에 파싱을 진행함  

# make_document(json)
파싱된 html 태그를 return하는 재귀함수  
인자로 json Object가 들어올 수 있음  
해당 내용을 파싱하여 html태그로 만들고 return함  
json 내부 key중 tag와 inner는 예외로 처리됨  
tag는 html 태그 종류를 나타내며, inner는 해당 html 태그 내부를 나타냄  
inner에 json이나 array가 올 수 있음. json일 경우 재귀 호출하며, array일 경우 그 크기만큼 반복하여 재귀호출함  
  

# json string의 형식
```json
{
    "name" : "name", //해당 json의 명칭이 들어오게 됩니다.
    "error" : false, //error의 여부를 나타냅니다. true일 경우 에러가 있다는 뜻입니다.
    "data" : {
        "tag" : "ul", // 태그 명
        "id" : "list", // 태그 id
        "inner" : [{ // 내부에 다시 태그를 넣을 수 있습니다. 이 경우는 배열로 여러개를 넣을 수 있습니다.
            "tag" : "li",
            "inner" : {
                "tag" : "a",
                "href" : "https://google.com", // href와 같은 속성도 줄 수 있습니다.
                "inner" : "1"}
        },
        {
            "tag" : "li",
            "inner" : {
                "tag" : "a",
                "href" : "javascript:;", // javascript 호출을 목표로 한 a태그 생성도 가능합니다.
                "inner" : "2"
            }
        },
        {
            "tag" : "li",
            "href" : " ",
            "onclick" : " ",
            "inner" : {
                "tag" : "a",
                "href" : "javascript:rest(json, id);",
                "inner" : "3"
            }
        },
        {
            "tag" : "li",
            "inner" : {
                "tag" : "a",
                "href" : "",
                "inner" : "4"
            }
        }
        ]}
}
```
위와 같은 형식을 띄게 됩니다.  
최상위 key는 name, error, data가 있습니다.
## name
해당 json string / file의 이름을 나타냅니다. 구분하기 위한 명칭이므로 특별한 작용이 일어나지 않습니다.

## error
해당 호출의 error 여부를 나타냅니다. 동적으로 json string을 생성할 때 이를 상정하여 작성하도록 합니다. 서버에서 오류가 일어나면 error값을 true로 전달해줍시다.

## data
error가 false일 때 파싱의 직접 대상이 되는 데이터 필드입니다. make_document()에는 data필드부터 들어가게 됩니다.

### 예외 - tag
html태그의 종류를 구분하기 위한 key입니다. 파싱할 때 예외로 처리됩니다.

### 예외 - inner
html태그 내부를 구성하기 위한 key입니다. 파싱할 때 예외로 처리됩니다.

### 속성
다른 모든 key는 html태그의 속성에 반영하도록 되어있습니다.