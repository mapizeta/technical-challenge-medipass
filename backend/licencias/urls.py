from django.urls import path

from licencias.views import LoginView, AdminTestView, MedicoTestView, LicenseListView

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("licencias", LicenseListView.as_view(), name="licencias-list"),
    path("test/admin", AdminTestView.as_view(), name="test-admin"),
    path("test/medico", MedicoTestView.as_view(), name="test-medico"),
]