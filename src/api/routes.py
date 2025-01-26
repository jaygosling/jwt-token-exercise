"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from hashlib import sha256

import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

salt = "l1FQ4pZ0pA"

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    body["email"] = body["email"].lower()
    user_data = User.query.filter_by(email=body["email"], password=(sha256((salt + body["password"]).encode('utf-8')).hexdigest())).first()
    if(user_data):
        token = create_access_token(identity=body['email'])
        return jsonify({"status": "success", "message": "Usuario identificado", "full_name": user_data.full_name, "token": token}), 200
    else:
        return jsonify({"status": "error"}), 200

@api.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    if "full_name" not in body or "email" not in body or "password" not in body:
       return jsonify({"status": "error", "message" : "Faltan uno o más de los campos obligatiorios"})
    body["email"] = body["email"].lower()
    user_data = User.query.filter_by(email=body["email"]).first()
    if(user_data):
       return jsonify({"status": "error", "message" : "El email ya está en uso"})
    else:
        new_user = User(email=body["email"], password=sha256((salt + body["password"]).encode('utf-8')).hexdigest(), full_name=body["full_name"])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status": "success", "message" : "Usuario registrado con éxito"}), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_data = User.query.filter_by(email=get_jwt_identity()).first()
    return jsonify({"status": "success", "message" : "El usuario tiene privilegios", "privilege": True}), 200
