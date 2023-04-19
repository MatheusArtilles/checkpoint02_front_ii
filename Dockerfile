FROM httpd:2.4
COPY ./index.html /usr/local/apache2/htdocs/
COPY ./cadastro.html /usr/local/apache2/htdocs/
COPY ./app.html /usr/local/apache2/htdocs/
COPY ./css/dark.css /usr/local/apache2/htdocs/css/dark.css
COPY ./css/login.css /usr/local/apache2/htdocs/css/login.css
COPY ./css/style.css /usr/local/apache2/htdocs/css/style.css
COPY ./js/login.js /usr/local/apache2/htdocs/js/login.js
COPY ./js/signup.js /usr/local/apache2/htdocs/js/signup.js
COPY ./js/darkmode.js /usr/local/apache2/htdocs/js/darkmode.js
COPY ./js/main.js /usr/local/apache2/htdocs/js/main.js
COPY ./js/mobile.js /usr/local/apache2/htdocs/js/mobile.js
COPY ./js/app.js /usr/local/apache2/htdocs/js/app.js
COPY ./audio/audio1.mp3 /usr/local/apache2/htdocs/audio/audio1.mp3
COPY ./audio/audio2.mp3 /usr/local/apache2/htdocs/audio/audio2.mp3
COPY ./img/banner-2-todols.png /usr/local/apache2/htdocs/img/banner-2-todols.png
COPY ./img/logo-tdols-2.png /usr/local/apache2/htdocs/img/logo-tdols-2.png
