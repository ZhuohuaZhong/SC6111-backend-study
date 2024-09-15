from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS
import pymysql
import random
import string
import hashlib

app = Flask(__name__)
CORS(app)

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    database='user_system'
)

@app.route('/')
def index():
    return redirect(url_for('login_page'))

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/sign_up')
def sign_up_page():
    return render_template('sign_up.html')


@app.route('/api/login', methods=['POST'])
def login_api():
    print("----------[Login]----------")
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    isRemember = data.get('isRemember')

    print(f'[Login] Received username: {username}')
    print(f'[Login] Received password: {password}')
    print(f'[Login] Received isRemember: {isRemember}')

    try:
        with connection.cursor() as cursor:
            # check username if exist
            check_query = 'SELECT id, password_ciphertext, salt FROM user WHERE username = %s'
            cursor.execute(check_query, (username,))
            result = cursor.fetchone()

            # username not exist
            if not result:
                print(f'[Login] Error: Username does not exist')
                return jsonify({
                    'status': 'Error',
                    'msg': 'Username does not exist',
                })
            
            # username exist
            id, password_ciphertext, salt = result
            print(f'[Login] Find record: id = {id} username = {username} password_ciphertext = {password_ciphertext} salt = {salt}')
            
            # check password correction
            current_password_ciphertext = encrypt_password(password, salt)
            if current_password_ciphertext != password_ciphertext:
                print(f'[Login] Error: Password is not correct')
                return jsonify({
                    'status': 'Error',
                    'msg': 'Password is not correct',
                })
            
            return jsonify({
                'status': 'Success',
                'msg': 'Login successfully',
            })
        
    except Exception as e:
        print(f'[Sign up] Error: {e}')
        return jsonify({
            'status': 'Error',
            'msg': f'Error: {e}',
        })
    

@app.route('/api/sign_up', methods=['POST'])
def sign_up_api():
    print("----------[Sign up]----------")
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    print(f'[Sign up] Received username: {username}')
    print(f'[Sign up] Received password: {password}')

    try:
        with connection.cursor() as cursor:
            # check username if is already existed
            check_query = 'SELECT COUNT(*) FROM user WHERE username = %s'
            cursor.execute(check_query, (username,))
            result = cursor.fetchone()

            if result[0] > 0:
                print(f'[Sign up] Error: Username is already existed')
                return jsonify({
                    'status': 'Error',
                    'msg': 'Username is already existed',
                })
            else:
                # insert
                salt = generate_salt()
                password_ciphertext= encrypt_password(password, salt)
                insert_query = 'INSERT INTO user (username, password_ciphertext, salt) VALUES (%s, %s, %s)'
                cursor.execute(insert_query, (username, password_ciphertext, salt, ))
                connection.commit()
                print(f'[Sign up] Sign up seccessfully: username = {username} password_ciphertext = {password_ciphertext} salt = {salt}')
                return jsonify({
                    'status': 'Success',
                    'msg': 'Sign up successfully',
                })
    except Exception as e:
        print(f'[Sign up] Error: {e}')
        return jsonify({
            'status': 'Error',
            'msg': f'Error: {e}',
        })

# generate different salt for each user
def generate_salt(length=16):
    salt = ''
    characters = string.ascii_letters + string.digits
    for _ in range(length):
        salt += random.choice(characters)
    return salt

# use salt to encrypt password
def encrypt_password(password, salt):
    password_ciphertext = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    # bin data to hex string
    password_ciphertext_hex = password_ciphertext.hex()
    return password_ciphertext_hex

if __name__ == '__main__':
    app.run(debug=True, port=8080)