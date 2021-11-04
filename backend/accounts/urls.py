from django.urls import path
from .views import LoginOrCreateUserView, LoadUserView

urlpatterns = [
    path('getNonce/<str:address>/', LoginOrCreateUserView.as_view(), name='login'),
    path('getUser/<str:address>/<str:nonce>/<str:signature>/', LoadUserView.as_view(), name='getUser'),    
]
