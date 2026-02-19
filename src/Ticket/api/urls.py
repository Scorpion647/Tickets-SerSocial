from rest_framework.routers import DefaultRouter
from Ticket.api.views import TicketView

router = DefaultRouter()
router.register("Ticket", TicketView, basename="Ticket")
urlpatterns = router.urls
