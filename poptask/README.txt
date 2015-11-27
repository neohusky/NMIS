System Requirements:
PHP v5.3
MYSQL v5.5+

Try xammp http://www.apachefriends.org/en/xampp.html

1. Copy poptask folder to your htdocs folder eg /var/www
4. Set up a cron job to run "task_populator.php" (this runs the email alerts and scheduling)
   eg */5 * * * * php -q /var/www/poptask/task_populator.php >/dev/null
2. Create a database on your local server
3. Access the setup.php script via your browser eg http://localhost/poptask/setup.php

6. Login 
	default username: admin 
	default password: password
