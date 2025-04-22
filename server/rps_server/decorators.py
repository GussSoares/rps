import asyncio
from functools import wraps


def websocket_notify_decorator(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Chama a view normalmente
        response = view_func(request, *args, **kwargs)

        # Envia notificação via WebSocket de forma assíncrona
        # asyncio.run(send_ws_notification({
        #     "mensagem": "Um endpoint protegido foi acessado!",
        #     "rota": request.path,
        # }))

        return response
    return _wrapped_view