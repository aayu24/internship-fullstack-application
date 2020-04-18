const BASE_URL = 'https://cfw-takehome.developers.workers.dev/api/variants';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class MyWriter {
    element(element) {
        if(element.tagName === 'title') {
            element.setInnerContent("First Cloudflare Project")
        }
        if(element.tagName === 'h1') {
            element.setInnerContent("Aayush Patni")
        }
        if(element.tagName ==='p') {
            element.setInnerContent("Love all things easy")
        }
        if (element.tagName ==='a') {
            element.setAttribute('href',"https://github.com/aayu24")
            element.setInnerContent("My github base")
        }
    }
}

//function to get Cookie but not working
function getCookie(request, name) {
    // Return result
    let result = null;
    // Retrieve Cookie as string
    let cookieString = request.headers.get('set-cookie');
    // If cookieString gets valid cookie/not empty string
    if (cookieString) {
        // split all our cookies into an array w/o semicolons
        let cookies = cookieString.split(';');
        // loop through each cookie to search for cookie w/ name @param name
        cookies.forEach(cookie => {
            // get cookie name
            let cookieName = cookie.split('=')[0].trim();
            // check if current cookie is the cookie we want
            if (cookieName === name) {
                // get value of cookie
                let cookieVal = cookie.split('=')[1];
                result = cookieVal;
            }
        });
    }
    return result;
}


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
    try {
        let response = await fetch(BASE_URL);
        let urlno = Math.floor(Math.random() * 2);
        let data = await response.json();
        let request = new Request(data.variants[urlno]);
        let result = await fetch(request);
        result = new Response(result.body, result);
        const mywriter = new HTMLRewriter()
                        .on('p#description', new MyWriter())
                        .on('title', new MyWriter())
                        .on('a#url', new MyWriter())
                        .on('h1#title', new MyWriter());

        return mywriter.transform(result);
  }
  catch(err){
    console.log("Error: " + err);
  }
}
