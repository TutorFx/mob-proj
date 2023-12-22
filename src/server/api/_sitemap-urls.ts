export default cachedEventHandler(
  async () => {
    const { data: business } = useFetch("/api/v1/crawler/business");
    return business.value?.map((p) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
        changefreq: "daily",
        priority: 0.8,
      };
    });
  },
  {
    name: "sitemap-dynamic-url",
    maxAge: 60 * 10, // cache URLs for 10 minutes
  },
);
