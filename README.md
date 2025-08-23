# Product Service Repo
This service provides information on all the products available

# Dev setup

## Javascript
1. Install node: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### javascript commands
1. install packages: `npm install`
2. run linting: `npm run lint`
3. run tests: `npm test`

## Docker
1. Install docker: https://docs.docker.com/engine/install/

### Docker commands
build
```bash
docker build -t devops-final-product .
```

image security scanning
```bash
trivy image devops-final-product
```

run
```bash
docker run -d -p 3001:3001 --name devops_final_product --env-file .env devops-final-product
```

## dev env using docker-compose 
1. Pull all the repos down

- [database](https://github.com/smturro2/DevOps-final-db)
- [order service](https://github.com/smturro2/DevOps-final-orders)
- [product service](https://github.com/smturro2/DevOps-final-products)
- [web app](https://github.com/smturro2/DevOps-final-web)

2. Use the following docker compose file as a base
```
name: devopsfinal

services:
  db:
    build:
      context: git_db
      dockerfile: Dockerfile
    env_file:
      - git_db/.env
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - ecommerce

  orders:
    build:
      context: git_order_serv
      dockerfile: Dockerfile
    env_file:
      - git_order_serv/.env
    ports:
      - "3002:3002"
    volumes:
      - ./git_order_serv/src:/app/src
    networks:
      - ecommerce

  products:
    build:
      context: git_product_serv
      dockerfile: Dockerfile
    env_file:
      - git_product_serv/.env
    ports:
      - "3001:3001"
    volumes:
      - ./git_product_serv/src:/app/src
    networks:
      - ecommerce

  web:
    build:
      context: git_web
      dockerfile: Dockerfile
    env_file:
      - git_web/.env
    volumes:
      - ./git_web:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    command: npm start
    networks:
      - ecommerce

networks:
  ecommerce:
    driver: bridge

volumes:
  pgdata:
```
