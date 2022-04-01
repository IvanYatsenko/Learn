class HTTPClient {
  async fetchData(url) {
    const res = await fetch(url)
    return await res.json()
  }
}

export default HTTPClient