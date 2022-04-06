
(function () {

  async function fetchData(urlStr) {
    let
      renponse = await fetch(urlStr),
      data = await renponse.json();
    return data;
  }

  async function createApp(pageNumber) {

    let urlStr = `https://gorest.co.in/public-api/posts?page`;
    urlStr = urlStr + `=${pageNumber}`;

    const
      titleElement = document.querySelector(`[data-content="title"]`),
      listElement = document.querySelector(`[data-content="list"]`),
      listLinkElement = document.querySelector(`[data-content="links"]`);

    listElement.innerHTML = '';

    let data = await fetchData(urlStr);

    const
      currentPage = data.meta.pagination.page,
      countOfPage = data.meta.pagination.pages;
    titleElement.textContent = `Page is ${currentPage} of ${countOfPage}`;

    for (let i = 1; (countOfPage + 1) > i; i++) {
      const linkPageElement = document.createElement('a');
      linkPageElement.href = "#";
      linkPageElement.addEventListener('click', () => {
        createApp(i);
      });
      linkPageElement.classList.add('link');
      linkPageElement.textContent = i;
      linkPageElement.setAttribute('data-page', `${i}`);
      listLinkElement.append(linkPageElement);
    }

    data.data.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.setAttribute('data-id', `${item.id}`);
      itemElement.classList.add('item__list');
      itemElement.textContent = item.title;
      itemElement.addEventListener('click', function (event) {
        document.location.href = `page.html?${event.target.dataset.id}`;
      });
      listElement.append(itemElement);
    });
  }

  async function createArticle() {
    const id = window.location.toString().split('?')[1];
    let urlStr = `https://gorest.co.in/public-api/posts/`;
    urlStr = urlStr + `${id}`;

    let data = await fetchData(urlStr);

    const
      titleElement = document.querySelector(`[data-content="title"]`),
      textElement = document.querySelector(`[data-content="text"]`),
      listComments = document.querySelector(`[data-content="comments"]`);

    titleElement.textContent = data.data.title;
    textElement.textContent = data.data.body;

    let urlStrComments = `https://gorest.co.in/public-api/comments?post_id=${id}`;
    let comments = await fetchData(urlStrComments);

    comments.data.forEach(comment => {
      const
        commentElement = document.createElement('li'),
        titleCommentElement = document.createElement('h4'),
        textCommentElement = document.createElement('p');
      titleCommentElement.textContent = `${comment.name} (${comment.email})`;
      textCommentElement.textContent = comment.body;
      commentElement.append(titleCommentElement);
      commentElement.append(textCommentElement);
      listComments.append(commentElement);
    });

    console.log(comments);
  }

  window.createApp = createApp;
  window.createArticle = createArticle;

})();
