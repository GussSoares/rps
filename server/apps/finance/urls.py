from django.urls import path
from apps.finance.viewsets import FinanceToPayViewSet, FinanceToReceiveViewSet, DashboardFinancesViewSet


to_pay = [
    path('to-pay/', FinanceToPayViewSet.as_view({"get": "list"}), name="to_pay_list"),
    path('to-pay/<uuid:pk>/', FinanceToPayViewSet.as_view({"get": "get"}), name="to_pay"),
    path('to-pay/chart/amount-by-service/', DashboardFinancesViewSet.as_view({"get": "get_to_pay_amount_by_service"}), name="get_to_pay_amount_by_service"),
    path('to-pay/chart/count-by-service/', DashboardFinancesViewSet.as_view({"get": "get_to_pay_count_by_service"}), name="get_to_pay_count_by_service"),
]

to_receive = [
    path('to-receive/', FinanceToReceiveViewSet.as_view({"get": "list"}), name="to_receive_list"),
    path('to-receive/<uuid:pk>/', FinanceToReceiveViewSet.as_view({"get": "get"}), name="to_receive"),
]

urlpatterns = [
    *to_pay,
    *to_receive,
]
