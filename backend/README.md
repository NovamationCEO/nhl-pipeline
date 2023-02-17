## Setting Up MySQL

- Install MySQL Community Server.
- Add MySQL to PATH
- export PATH=$PATH:/usr/local/mysql-8.0.32-macos13-x86_64/bin
- sudo mysql -u root -p
- CREATE USER 'pipeline_app'@'localhost' IDENTIFIED BY 'Keep Your Stick"
- GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'pipeline_app'@'localhost' WITH GRANT OPTION;
- FLUSH PRIVILEGES;
- CREATE DATABASE nhl_db;

## Stay in touch

- Author - [Chris Young](novamation@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
