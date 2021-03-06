var debug = true;

function print(a){
    if(debug){
        console.log(a)
    }
}

function parsing(string, id){
    return_json = JSON.parse(string)
    print("descript : " + return_json.descript)
    if(return_json.error == false){
        print("is error : no")
        document.getElementById(id).innerHTML = ""
        if(Array.isArray(return_json.data)){
            for(var i = 0; i < Object.keys(return_json.data).length; i++)
            {
                document.getElementById(id).appendChild(make_document(return_json.data[i]))
            }
        }
        else{
            document.getElementById(id).appendChild(make_document(return_json.data))
        }
    }
    else if(return_json.error == true){
        print("is error : yes")
    }
    else {
        print('error : has no error field')
    }
}

// REST API 실행하는 내용
function rest(url, id){

    print("url : " + url)
    // XMLHttpRequest 객체의 인스턴스를 생성합니다.
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        // xhr 객체의 status 값을 검사한다.
        if (xhr.status === 200) {
            parsing(xhr.responseText, id)
        }
    }

    // open() 메서드는 요청을 준비하는 메서드입니다. (http 메서드, 데이터를 받아올 URL 경로, 비동기 여부)
    xhr.open("GET", url, true);

    // send() 메서드는 준비된 요청을 서버로 전송하는 메서드입니다. (서버에 전달될 정보)
    xhr.send("");
}

function make_document(json){
    var newTag = document.createElement(json.tag)
    for(var key in json)
    {
        if(key == "tag"){
            print("tag : " + json[key])
        }
        else if(key == "inner"){
            print(typeof(json.inner))
            if(json.inner == false){
                print("inner : 비어있음")
            }
            else if (Array.isArray(json.inner)){
                print("inner : Array=" + Object.keys(json.inner).length)
                for (var i = 0; i < Object.keys(json.inner).length; i++){
                    newTag.appendChild(make_document(json.inner[i]))
                }
            }
            else if(typeof(json.inner) == "object"){
                print("inner : " + typeof(json.inner))
                newTag.appendChild(make_document(json.inner))
            }
            else{
                print("inner : " + json.inner)
                newTag.innerHTML = json.inner
            }
        }
        else{
            newTag.setAttribute(key, json[key])
        }
    }
    return newTag
}
