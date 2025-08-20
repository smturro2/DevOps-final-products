# Docker commands
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

tag
```bash
docker tag devops-final-product denture8278/devops-final-product:v1.0
docker tag devops-final-product denture8278/devops-final-product:latest
```

push
```bash
docker push denture8278/devops-final-product:v1.0
docker push denture8278/devops-final-product:latest
```