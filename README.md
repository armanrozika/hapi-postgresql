# hapi-postgresql
react, hapi, postgresql, and nodejs

Terdapat tiga folder dalam repositori ini, yakni folder /client (react js dengan development environment), /server (hapijs dengan menggunakan nodejs) yang di dalamnya berisi subfolder ../public yang berasal dari build react pada folder client, serta /API (menggunakan hapi js, terhubung ke postgresql).

Untuk instalasi, pastikan sudah terdapat nodejs dan postgresql terinstall pada mesin. Dalam project ini, konfigurasi pada postgresql yakni nama database `jubelio`, nama user `arman`, password `1`, online pada port default postgresql yakni `http://localhost:5432`. Jika ingin menjalankan project ini tanpa konfigurasi di server, maka buatlah konfigurasi database seperti di atas, setelah itu tambahkan tabel `barang`, dengan column `id` sebagai primary_key, column `name` text, column `price` integer, column `description` text, dan column `picurl` text.

Gambar yang diunggah pada halaman addpost akan ditambahkan langsung ke dalam folder /upload di dalam /API.

Sebelum menjalankan server dan API, pastikan untuk menginstall dependency yang dibutuhkan, jalankan `npm install` pada kedua folder tersebut.

Untuk menjalankan server, pastikan postgresql sudah online `$ sudo service postgresql start`, atau nyalakan pgAdmin. Setelah itu jalankan API `user@computer:~/API $npx nodemon index.js`, kemudian nyalakan server dengan mengeksekusi file index.js dalam folder server `user@computer:~/server $npx nodemon index.js`
