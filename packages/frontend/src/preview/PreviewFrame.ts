export default `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="http://localhost:9090/dist/paged.js"></script>
    <script>
        var paged = new Paged.Previewer();
        window.addEventListener("message", function(event) {
            try {
                var d = JSON.parse(event.data);
                var html = d.html;
                var css = d.css;

                if (paged.polisher) {
                paged.polisher.destroy();
                paged.polisher = new Paged.Polisher(false);
                }

                const placeholder = document.createElement('div');
                placeholder.innerHTML = html;
                    let flow = paged.preview(placeholder, css, document.getElementById('container')).then((flow) => {
                    const container = document.querySelector('.pagedjs_pages');
                    if (container) {
                        container.style.transformOrigin = 'top';
                        container.style.transform = 'scale(.5) translate(0px, 100px)';
                    }
                    const pages = Array.from(document.querySelectorAll('.pagedjs_page'));
                    pages.forEach((page) => {
                        page.style.backgroundColor = '#fdfdfd';
                        page.style.marginBottom = '16px';
                    })
                })
            } catch(err) {
                console.error(err);
            };
        });
    </script>
</head>
<body>
   <div id="container"></div> 
</body>
</html>`