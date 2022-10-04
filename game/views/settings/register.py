from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data = request.GET
    username = data.get('username', "").strip()
    password = data.get('password', "").strip()
    password_confirm = data.get('password_confirm', "").strip()
    if not username or not password:
        return JsonResponse({
            "result": "用户名和密码不正确",
        })
    if password_confirm != password:
        return JsonResponse({
            "result": "密码不一致"
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            "result": "用户名已存在"
        })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://tse2-mm.cn.bing.net/th/id/OIP-C.u3fl-wM3oxxjcmlSoxUDXgHaHY?pid=ImgDet&rs=1")
    login(request, user)
    return JsonResponse({
         "result": "success"
    })

