from rest_framework.routers import DefaultRouter
from Comentario.api.views import ComentarioViewSet

router = DefaultRouter()
router.register("Comentario", ComentarioViewSet, basename="Comentario")
urlpatterns = router.urls
