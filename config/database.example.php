<?php
// Copy as database-config.php into the EXISTING private directory, outside the website.
// Enable only after a successful migration and verification. These are placeholders.
return [
 'driver'=>'mysql',
 'host'=>'localhost',
 'port'=>3306,
 'database'=>'YOUR_DEDICATED_DATABASE',
 'username'=>'YOUR_APPLICATION_USER',
 'password'=>'YOUR_PASSWORD',
 // 'ssl_ca'=>'/absolute/path/to/provider-ca.pem', // If required by your MySQL host.
];
