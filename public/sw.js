self.addEventListener("fetch", e => {
  if (e.request.url.match(/google-analytics.com\/?(\w)?\/collect/gi)) {
    if (e.request.method === 'GET') {
      e.respondWith(fetch(e.request.url.replace(/https:\/\/www.google-analytics.com\/?(\w)?\/collect/gi, '/analytics')))
    } else {
      e.request.text().then(body => {

        e.respondWith(
          fetch(
            e.request.url.replace(/https:\/\/www.google-analytics.com\/?(\w)?\/collect/gi, '/analytics'),
            {method: 'POST', body}
          )
        )
      })
    }
  }
})
