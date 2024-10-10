from google.oauth2 import service_account
from googleapiclient.discovery import build

RUTA_CREDENCIALES = "Credenciales/CuentaServicioGoogle.json"


def ObtenerAutenticacion():
    SCOPES = ['https://www.googleapis.com/auth/calendar']

    try:
        credenciales = service_account.Credentials.from_service_account_file(
                    RUTA_CREDENCIALES, scopes=SCOPES)
        servicioCalendar = build('calendar', 'v3', credentials=credenciales) 
        return servicioCalendar
    except Exception as e:
        return None