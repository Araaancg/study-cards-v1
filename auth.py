import requests as req
from flask import request, session, redirect, url_for
import secrets
from hashlib import sha256
from functools import wraps

def authenticate(f): #login
        @wraps(f)
        def i(*args, **kwargs):
            email = request.form.get("email")
            pwd = request.form.get("pwd")
            if email and pwd:
                print(email,pwd,"----------------------------")
                api_res = req.put("http://localhost:5000/api/token", data={"email":email,"pwd":sha256(pwd.encode()).hexdigest(),"token":secrets.token_hex(16)}).json()
                if api_res["success"]:
                    session["token"] = api_res["token"]
                    session["id"] = api_res["id"]
                    return redirect(url_for("home"))
                return f(msg=api_res["msg"])
            return f(msg=False)
        return i
    
def authorize(f):
    @wraps(f)
    def i(*args, **kwargs):
        cookie_id = session.get("id")
        cookie_token = session.get("token")
        if cookie_id and cookie_token:
            api_res = req.get(f"http://localhost:5000/api/token?token={cookie_token}&id={cookie_id}").json()
            if api_res["success"]:
                return f(*args, **kwargs)
        return redirect(url_for("login"))
    return i
