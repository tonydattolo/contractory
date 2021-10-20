from django.urls import path
from .views import RegisterView, LoadUserView, GetNonceView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('user', LoadUserView.as_view()),
    path('getnonce', GetNonceView.as_view()),

]
