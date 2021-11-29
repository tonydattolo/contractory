from django.urls import path

from .views import (
    CreateSmartContractView,
    SmartContractListViewByOwner,
    SmartContractDeleteView,
    GetContractDetailView,
    AddPartyToSmartContractView
    )

urlpatterns = [
    path('create/', CreateSmartContractView.as_view(), name='create'),
    path('list/<str:email>/<str:type>/', SmartContractListViewByOwner.as_view(), name='list'),
    path('delete/<str:id>/', SmartContractDeleteView.as_view(), name='delete'),
    path('detail/<str:id>/', GetContractDetailView.as_view(), name='detail'),
    path('add_party/<str:id>/', AddPartyToSmartContractView.as_view(), name='add_party'),
]
