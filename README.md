# Тестовое задание для cenix

## Зависимости
``` bash
yarn 
```
## ES6
Требуется включить работу с модулями. Для этого нужно прописать в ```package.json``` 
``` json
      "type": "module",
```
## Одиночный запуск
``` shell
node index.js https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202 "Санкт-Петербург и область"

```

## Множественный запуск 
### Реализован через bash-скрипт
``` bash
./test.sh 
```
Предварительно в скрипте нужно изменить переменные ```REGLIST``` и ```LINKS``` 



### Для демонстрации присутствует makefile

## Результат работы. 
- Создается папка с регионом и id товара
- Туда складывается скриншот и полученная информация