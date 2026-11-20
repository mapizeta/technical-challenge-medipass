from django.urls import path

from licencias.views import LoginView, LicenseListView, LicenseDetailView, LicenseCreateView

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("licencias", LicenseListView.as_view(), name="licencias-list"),
    path("licencia/<str:pk>",LicenseDetailView.as_view(),name="licencia-detail"),
    path("licencia",LicenseCreateView.as_view(),name="licencias-create"
),
]