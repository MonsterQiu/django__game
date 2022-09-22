from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 找到game里面的url
    path("game/", include('game.urls')),
    path("admin/", admin.site.urls),
]
