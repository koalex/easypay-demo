<h1 align="center">EasyPay</h1>

<p align="center">
  <img width="246" height="387" src="https://github.com/koalex/easypay-demo/blob/master/cover.jpg">
</p>

## Использование

#### На OAuth авторизацию не хватило времени :(

1. Установить зависимости:
  ```bash
  npm install
  ```

2. Скачать образ и создать контейнер БД:
  ```bash
  docker run -d -p 27017:27017 -v /$(pwd)/data:/data/db --name mongodb mongo
  ```

## Демо

1. Запустить сервер:
  ```bash
  npm start
  ```

2. Перейти на [localhost:3000](http://localhost:3000)

3. Логин **test@test.com** Пароль **test123**

## Режим разработки

  ```bash
	npm run dev
  ```

## Сборка production

  ```bash
	npm run build
  ```
