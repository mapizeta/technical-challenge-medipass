from django.urls import path

from licencias.views import LoginView, LicenseListView, LicenseDetailView

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("licencias", LicenseListView.as_view(), name="licencias-list"),
    path("licencias/<str:pk>",LicenseDetailView.as_view(),name="licencia-detail"),
]