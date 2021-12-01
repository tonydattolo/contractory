from django.urls import path

from .views import (
    CreateSmartContractView,
    SmartContractListViewByOwner,
    SmartContractDeleteView,
    GetContractDetailView,
    AddPartyToSmartContractView,
    AddClauseToContractView,
    DeleteClauseFromContractView
    )

urlpatterns = [
    path('create/', CreateSmartContractView.as_view(), name='create'),
    path('list/<str:email>/<str:type>/', SmartContractListViewByOwner.as_view(), name='list'),
    path('delete/<str:id>/', SmartContractDeleteView.as_view(), name='delete'),
    path('detail/<str:id>/', GetContractDetailView.as_view(), name='detail'),
    path('add_party/<str:id>/', AddPartyToSmartContractView.as_view(), name='add_party'),
    path('add_clause/<str:contract_id>/', AddClauseToContractView.as_view(), name='add_clause'),
    path('delete_clause/<str:contract_id>/', DeleteClauseFromContractView.as_view(), name='delete_clause'),
]
