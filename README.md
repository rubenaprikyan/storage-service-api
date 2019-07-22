# NGINX CONFIG FOR HTTP
## FOR HTTPS PLS CONFIGURE SSL SERTIFICATE AND 443 PORT
``
 server {
        listen 80;

        root /var/www/store.minobike.com;
        index index.html index.htm index.nginx-debian.html;

        server_name <name>;

        location / {
                try_files $uri $uri/ =404;

                proxy_pass http://localhost:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}



``
