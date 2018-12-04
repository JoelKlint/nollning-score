# Set up

- Start a local MySQL database
```sh
# In shell
```sh
docker run --rm --name nollning_score_dev_db -d -p 3306:3306 -e "MYSQL_DATABASE=backend_feathers" -e "MYSQL_ROOT_PASSWORD=root" mysql:5.7.24
```

- Start
```sh
# In shell
npm start
```


# Interacting with database
## Login
```sh
mysql -h 0.0.0.0 -u root -proot
```

## Seed
```sh
npm run db:seed
```
