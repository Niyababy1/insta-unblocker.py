// A public CORS gateway to relay raw web headers safely
const PROXY_GATEWAY = "https://allorigins.win";

self.addEventListener('fetch', (event) => {
    const requestUrl = event.request.url;

    // Intercept web requests directed to our internal proxy path
    if (requestUrl.includes('/proxy/')) {
        const targetParts = requestUrl.split('/proxy/');
        const actualTargetUrl = decodeURIComponent(targetParts[1]);

        console.log(`[Worker] Redirecting request to: ${actualTargetUrl}`);

        // Reroute the frame request out to the unblocked gateway
        event.respondWith(
            fetch(PROXY_GATEWAY + encodeURIComponent(actualTargetUrl))
                .then(response => response)
                .catch(err => new Response("Connection Error: " + err.message))
        );
    }
});
