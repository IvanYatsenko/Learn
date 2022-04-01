export function render(data) {
    console.log(data)

    const container = document.createElement('div')
    container.classList.add(
        'container',
        'd-flex',
        'justify-content-between',
        'flex-wrap',
        'py-4'
    )

    for(const product of data) {
        const productCard = document.createElement('div')
        const image = document.createElement('image')
        const bodyCard = document.createElement('div')
        const title = document.createElement('h5')
        const price = document.createElement('p')
        const detailsLink = document.createElement('a')

        productCard.style.width = '18%'
        productCard.classList.add('card', 'my-2')
        image.classList.add('card-img-top')
        bodyCard.classList.add('card-body')
        title.classList.add('card-title')
        price.classList.add('card-text')
        detailsLink.classList.add('btn', 'bnt-primary')

        productCard.append(image)
        productCard.append(bodyCard)
        bodyCard.append(title)
        bodyCard.append(price)
        bodyCard.append(detailsLink)

        image.alt = 'image'
        title.textContent = product.title
        price.textContent = product.user_id
        detailsLink.textContent = 'Подробнее'
        detailsLink.href = `?productId=${product.id}`

        container.append(productCard)
    }
    return container
}