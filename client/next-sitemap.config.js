// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://reeltone.streamgrid.site",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    return [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/films", changefreq: "daily", priority: 0.8 },
      { loc: "/films/filter", changefreq: "weekly", priority: 0.7 },
    ];
  },
};
