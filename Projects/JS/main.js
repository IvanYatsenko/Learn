
let cssPromises = {};

function loadResourse(src) {
    if (src.endsWith('.js')) {
        return import(src)
    }

    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve())
            })
            document.head.append(link)
        }
        return cssPromises[src]
    }

    return fetch(src).then(rec => rec.json())

}

const appContainer = document.getElementById('app')

const searchParams = new URLSearchParams(location.search)

const productId = searchParams.get('productId')

function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResourse(src)))
        .then(([pageModule, data]) => {
            appContainer.innerHTML = ''
            appContainer.append(pageModule.render(data))
        })
}

if (productId) {
    renderPage(
        './product-deatail.js',
        `https://gorest.co.in/public/v2/todos${productId}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    )
} else {
    renderPage(
        './product-list.js',
        'https://gorest.co.in/public/v2/todos',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    )
}



