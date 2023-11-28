export default cachedEventHandler(
  async (e) => {
    const business = await $fetch('/api/v1/crawler/business')
    return business.map((p) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
        changefreq: 'daily',
        priority: 0.8
      }
    })
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 10 // cache URLs for 10 minutes
  }
)
