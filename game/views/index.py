from django.shortcuts import render


def index(request):
    user = request.user

    return render(request, "multiends/web.html", {'user': str(user)})
