https://github.com/user-attachments/assets/b5e170ad-e98d-440b-bfba-c1ee46e64afa

He utilizado la db gratuita de Railway, importando las tablas y el contenido mediante scripts ejecutables que puedes encontrar en /scripts

Para ejecutar en local:

- Añadir variable de entorno DATABASE_URL con credenciales (Railway Postgres)

```shell
npm i
npm run db:sync
npm run db:seed
npm run dev
```
