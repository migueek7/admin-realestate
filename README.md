<!-- CONSTRUIR UNA IMAGEN DESDE dockerfile -->
docker build -t apirestphp8 .
docker build --no-cache -t apirestphp8 

<!-- LEVANTAR EL CONTENEDOR DEL PROYECTO -->
docker run -d -v ${PWD}/src:/var/www/html/ -p 5510:80 --name adminvps apirestphp8

NOTA IMPORTANTE: 
Usar Dirección IPv4 en lugar de localhost para la APIREST_URL
Cuando subes al proyecto a produccion debe tener SSL activo para que funcione bien.
si el SSL no esta bien activo fallara y no cargara las paginas.