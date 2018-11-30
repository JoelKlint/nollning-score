# Set up

- Start a local MySQL database
```sh
# In shell
```sh
docker run --rm -d -p 3306:3306 -e "MYSQL_DATABASE=backend_feathers" -e "MYSQL_ROOT_PASSWORD=root" mysql:5.7.24
```

- Start
```sh
# In shell
npm start
```
