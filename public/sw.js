self.addEventListener("fetch", e => {
  if (e.request.url.match(/google-analytics.com\/collect/gi)) {
    e.respondWith(fetch(e.request.url.replace(/https:\/\/www.google-analytics.com\/collect/gi, '/analytics')))
  }
})