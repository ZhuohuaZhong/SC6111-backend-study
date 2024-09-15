from flask import Flask, request, jsonify
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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    name = data.get('name')
    password = data.get('password')

    print(f'Received Name: {name}')
    print(f'Received Password: {password}')

    status = 'Fail'

    if name == 'admin' and password == 'password':
        status = 'Success'

    return jsonify({
        'status': status,
    })

@app.route('/sign_up', methods=['POST'])
def sign_up():
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
                print(f'[Sign up] Error: User name is already existed')
                return jsonify({
                    'status': 'Error',
                    'msg': 'User name is already existed',
                })
            else:
                # insert
                password_ciphertext, salt = encrypt_password(password)
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
def encrypt_password(password):
    salt = generate_salt()
    password_ciphertext = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    # bin data to hex string
    password_ciphertext_hex = password_ciphertext.hex()
    return password_ciphertext_hex, salt

if __name__ == '__main__':
    app.run(debug=True, port=8080)