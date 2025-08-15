from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size_query_param = "per_page"

    def get_paginated_response(self, data):
        # return super().get_paginated_response(data)
        current_page = self.page.number
        total_pages = self.page.paginator.num_pages

        previous_page = current_page - 1 if self.page.has_previous() else None
        next_page = current_page + 1 if self.page.has_next() else None

        return Response(
            {
                "previous": previous_page,
                "next": next_page,
                "page": current_page,
                "total_pages": total_pages,
                "per_page": self.get_page_size(self.request),
                "total": self.page.paginator.count,
                "results": data,
            }
        )
