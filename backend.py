from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True, port=8080)