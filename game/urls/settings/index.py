from django.urls import path, include
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin
from game.views.settings.login_web import index
urlpatterns = [
    path("", index, name="login_web"),
    path('getinfo/', getinfo, name='settings_getinfo'),
    path('login/', signin, name='settings_login'),
]
