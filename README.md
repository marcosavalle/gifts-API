Pasos para iniciar el proyecto:

1) Abrir una consola en la carpeta donde se quiere clonar el repositorio y ejecutar:

            git clone git@gitlab.com:mercadolibre-regalos/backend/api-restful.git

2) Moverse a la nueva carpeta creada:

            cd api-restful

3) Instalar las dependencias:

            npm install
        
4) Crear el archivo .env en la raiz del repositorio, y pegarle el contenido del archivo .env.example, reemplazando los valores por sus propios valores.


5) Iniciar la aplicacion:

            npm start

Con esto debe devolver el mensaje "Meli-regalos API running...", y estará disponible en http://localhost:puerto/graphql la interfaz de apollo para desarrollo.