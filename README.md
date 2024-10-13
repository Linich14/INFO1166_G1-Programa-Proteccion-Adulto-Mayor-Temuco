# INFO1166_G1-Programa-Proteccion-Adulto-Mayor-Temuco
Trabajo del Grupo N°1 para la Municipalidad de Temuco en respuesta a la problematica de la Agenda para los Adultos mayores del sector

## ¿De que trata el proyecto? 

## Aplicacion Movil/Web
- Movil
- Web

## Aplicacion Backend
Se creara una api rest mediante el framework django con django-framework para poder ejecutar la aplacacion es 
necesario definir las variables de entorno en un **.env** en la raiz del proyecto con los siguientes datos. 
- **Variables de entorno**
``` .env 
HOST_IP=           # IP de la maquina para acceder de un dispositivo externo
```
- **Entorno virtual y instalacion de paquetes** <br/>
Para trabajar de mejor manera es recomendable un entorno virtual para las dependencias. Se esta utilizando venv
**venv**
```
python -m venv venv
```
- Activar el entorno virtual para python 
```
source .venv/bin/activate.fish   # Linux
source .venv/bin/activate        # Bash / zsh
.\venv\Scripts\activate (cmd) o .\venv\Scripts\Activate.ps (PowerShell)
```
- Instalar las dependencias del proyecto, todas estas se encuentran en el archivo **requirements.txt**
```
pip install -r requirements.txt
```













