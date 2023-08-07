function changePage(content){
  location.href = `B.html?content=${content}`
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const content = urlParams.get('content');

if (content) {
  let titleText;

  if (content === 'abc') {
    titleText = '안녕하세요';
  } else if (content === 'cba') {
    titleText = '환영합니다';
  } else {
    titleText = content;
  }

  document.getElementById("content").innerHTML = `내용: ${content}`;
}
