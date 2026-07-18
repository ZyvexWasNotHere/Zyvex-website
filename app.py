from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")


# ------------------ Pages ------------------

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("signup.html")

    fullname = request.form["fullname"]
    email = request.form["email"]
    password = request.form["password"]
    confirmPassword = request.form["confirmPassword"]

    # بررسی یکی بودن رمزها
    if password != confirmPassword:
        flash("Passwords do not match.")
        return redirect(url_for("signup"))

    # بررسی تکراری بودن ایمیل
    try:
        with open("users.txt", "r", encoding="utf-8") as file:
            if f"Email: {email}" in file.read():
                flash("This email is already taken.")
                return redirect(url_for("signup"))
    except FileNotFoundError:
        pass

    # هش کردن رمز
    hashedPassword = generate_password_hash(password)

    # ذخیره کاربر
    with open("users.txt", "a", encoding="utf-8") as file:
        file.write(f"Name: {fullname}\n")
        file.write(f"Email: {email}\n")
        file.write(f"Password: {hashedPassword}\n")
        file.write("-" * 30 + "\n")

    flash("Account created successfully!")
    return redirect(url_for("signup"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")

    email = request.form["email"]
    password = request.form["password"]

    try:
        with open("users.txt", "r", encoding="utf-8") as file:
            users = file.read().split("------------------------------")

            for user in users:
                if f"Email: {email}" in user:
                    for line in user.splitlines():
                        if line.startswith("Password:"):
                            saved_password = line.replace("Password: ", "")

                            if check_password_hash(saved_password, password):
                                return redirect(url_for("welcome"))

                            flash("Incorrect password.")
                            return redirect(url_for("login"))

        flash("You haven't signed up yet.")
        return redirect(url_for("login"))

    except FileNotFoundError:
        flash("No users found.")
        return redirect(url_for("login"))


@app.route("/welcome")
def welcome():
    return render_template("welcome.html")


if __name__ == "__main__":
    app.run(debug=True)