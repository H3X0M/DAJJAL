export default {
  async fetch(request, env, ctx) {
    const urls = [
      "https://qtvid.pw/nodejs/vision.txt",
      "https://qtvid.pw/tv_baru/malaysia/malay.m3u",
      "https://qtvid.pw/nodejs/vidio.txt",
      "https://qtvid.pw/tv_baru/astro/astro.m3u",
      "https://qtvid.pw/tv_baru/vidio/pilem.php",
      "https://qtvid.pw/nodejs/event.txt"
    ];

    const headers = {
      "Host": "qtvid.pw",
      "User-Agent": "6DpbEl58AHsxoKcLvDbiELQfMZBANe1n7OCyOC14O28=",
      "Accept-Encoding": "gzip"
    };

    const playlistParts = await Promise.all(urls.map(async (url) => {
      try {
        const res = await fetch(url, { headers });
        return await res.text();
      } catch (err) {
        return `# Error fetching ${url}: ${err.message}`;
      }
    }));

    const finalPlaylist = playlistParts.join("\n\n");

    return new Response(finalPlaylist, {
      headers: { "Content-Type": "audio/x-mpegurl; charset=utf-8" }
    });
  }
};
