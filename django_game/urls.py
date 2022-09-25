from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 找到game里面的url
    path("", include("game.urls.index")),
    path("menu/", include("game.urls.menu.index")),
    path("admin/", admin.site.urls),
]
