from django.urls import path
from .views import (
    AddWalletView,
    GetNonceView,
    ConfirmSignatureView
    # WalletListView,
    # WalletDetailView,
    # WalletCreateView,
    # WalletUpdateView,
    # WalletDeleteView,
    # WalletTransactionListView,
    # WalletTransactionDetailView,
    # WalletTransactionCreateView,
    # WalletTransactionUpdateView,
    # WalletTransactionDeleteView,
)

url_patterns = [
    path('add/', AddWalletView.as_view(), name='add_wallet'),
    path('get_nonce/', GetNonceView.as_view(), name='get_nonce'),
    path('confirm_signature/', ConfirmSignatureView.as_view(), name='confirm_signature'),
    # path('', WalletListView.as_view(), name='wallet_list'),
    # path('<int:pk>/', WalletDetailView.as_view(), name='wallet_detail'),
    # path('new/', WalletCreateView.as_view(), name='wallet_create'),
    # path('<int:pk>/update/', WalletUpdateView.as_view(), name='wallet_update'),
    # path('<int:pk>/delete/', WalletDeleteView.as_view(), name='wallet_delete'),
    # path('<int:pk>/transactions/', WalletTransactionListView.as_view(), name='wallet_transaction_list'),
    # path('<int:pk>/transactions/<int:transaction_pk>/', WalletTransactionDetailView.as_view(), name='wallet_transaction_detail'),
    # path('<int:pk>/transactions/new/', WalletTransactionCreateView.as_view(), name='wallet_transaction_create'),
    # path('<int:pk>/transactions/<int:transaction_pk>/update/', WalletTransactionUpdateView.as_view(), name='wallet_transaction_update'),
    # path('<int:pk>/transactions/<int:transaction_pk>/delete/', WalletTransactionDeleteView.as_view(), name='wallet_transaction_delete'),
]
