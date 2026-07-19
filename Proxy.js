  1  export default {
  2    async fetch(request) {
  3      const url = new URL(request.url);
  4      const targetUrl = url.searchParams.get('url');
  5  
  6      if (!targetUrl) {
  7        return new Response('Missing url parameter', { status: 400 });
  8      }
  9  
 10      const response = await fetch(targetUrl, {
 11        headers: { 'User-Agent': 'Mozilla/5.0' }
 12      });
 13  
 14      let content = await response.text();
 15      const proxyBase = url.protocol + '//' + url.host + url.pathname + '?url=';
 16  
 17      content = content.replace(/(https?:\/\/[^\s]+\.ts)/g, (match) => {
 18        return proxyBase + encodeURIComponent(match);
 19      });
 20  
 21      return new Response(content, {
 22        headers: {
 23          'Content-Type': 'application/vnd.apple.mpegurl',
 24          'Access-Control-Allow-Origin': '*'
 25        }
 26      });
 27    },
 28  };
