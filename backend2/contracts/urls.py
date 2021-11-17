from django.urls import path

from .views import (
    CreateSmartContractView,
    SmartContractListViewByOwner,
    SmartContractDeleteView,
    )

urlpatterns = [
    path('create/', CreateSmartContractView.as_view(), name='create'),
    path('list/<str:email>/<str:type>/', SmartContractListViewByOwner.as_view(), name='list'),
    path('delete/<int:id>/', SmartContractDeleteView.as_view(), name='delete'),
]
