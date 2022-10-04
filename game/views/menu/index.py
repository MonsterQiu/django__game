from django.shortcuts import render
from django.contrib.auth import authenticate, login


def index(request):
    user = request.user

    return render(request, "menu/menu.html", {'user': str(user)})
