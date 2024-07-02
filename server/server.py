import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)

uri = "MONGODB_CONNECTION_LINK"
client = MongoClient(uri, server_api=ServerApi('1'))

WHITELISTED_IP = ""  # IF YOU RESTART THE SERVER MAKE SURE TO RUN THE IP UPDATE TOOL


@app.route('/OBFUSCATED_ROUTE/', methods=['GET'])
def OBFUSCATED_ROUTE():
    new_ip = str(request.args.get("ip"))
    global WHITELISTED_IP  # I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON I HATE PYTHON
    WHITELISTED_IP = new_ip
    return jsonify("Success")


def get_client_ip():
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers['X-Forwarded-For'].split(',')[0]
    else:
        ip = request.remote_addr
    return ip


@app.route('/post/', methods=['GET'])
def post():
    client_ip = get_client_ip()
    if client_ip == WHITELISTED_IP:

        artist_name = str(request.args.get("artist_name"))
        artist_image = str(request.args.get("artist_image"))
        artist_comment = str(request.args.get("artist_comment"))
        album_name = str(request.args.get("album_name"))
        album_image = str(request.args.get("album_image"))
        album_comment = str(request.args.get("album_comment"))

        db = client['EvsMusicSpam']
        collection = db['Posts']

        cursor = collection.find({}, {'id': 1})
        new_id = 0
        for document in cursor:
            print(document)
            if int(document["id"]) >= new_id:
                new_id = int(document["id"]) + 1

        new_post = {
            "id": new_id,
            "artist_name": artist_name,
            "artist_image": artist_image,
            "artist_comment": artist_comment,
            "album_name": album_name,
            "album_image": album_image,
            "album_comment": album_comment,
        }
        collection.insert_one(new_post)
        return jsonify({"message": "Access granted",
                        "stuff": [artist_name, artist_image, artist_comment, album_name, album_image, album_comment]})
    else:
        return jsonify({"message": "Access denied"}), 403


@app.route('/edit/', methods=['GET'])
def edit():
    client_ip = get_client_ip()
    if client_ip == WHITELISTED_IP:

        post_id = str(request.args.get("post_id"))
        artist_name = str(request.args.get("artist_name"))
        artist_image = str(request.args.get("artist_image"))
        artist_comment = str(request.args.get("artist_comment"))
        album_name = str(request.args.get("album_name"))
        album_image = str(request.args.get("album_image"))
        album_comment = str(request.args.get("album_comment"))

        db = client['EvsMusicSpam']
        collection = db['Posts']
        collection.delete_one({'id': int(post_id)})

        new_post = {
            "id": int(post_id),
            "artist_name": artist_name,
            "artist_image": artist_image,
            "artist_comment": artist_comment,
            "album_name": album_name,
            "album_image": album_image,
            "album_comment": album_comment,
        }
        collection.insert_one(new_post)
        return jsonify({"message": "Access granted",
                        "stuff": [post_id, artist_name, artist_image, artist_comment, album_name, album_image,
                                  album_comment]})
    else:
        return jsonify({"message": "Access denied"}), 403


@app.route('/access/', methods=['GET'])
def access():
    client_ip = get_client_ip()
    if client_ip == WHITELISTED_IP:
        return jsonify({"message": "Access granted"})
    else:
        return jsonify({"message": "Access denied"})


@app.route('/previews/', methods=['GET'])
def previews():
    db = client['EvsMusicSpam']
    collection = db['Posts']

    cursor = collection.find({}, {'id': 1, 'artist_name': 1, 'album_name': 1, 'album_image': 1, '_id': 0})
    data = []
    for i in cursor:
        data.append(i)
    return jsonify(data)


@app.route('/one/<req>', methods=['GET'])
def one(req):
    db = client['EvsMusicSpam']
    collection = db['Posts']
    data = collection.find_one({'id': int(req)}, {'_id': 0})
    return jsonify(data)


@app.route('/delete/<req>', methods=['GET'])
def delete(req):
    client_ip = get_client_ip()
    if client_ip == WHITELISTED_IP:
        db = client['EvsMusicSpam']
        collection = db['Posts']
        collection.delete_one({'id': int(req)})
        return jsonify("Deleted " + req)


if __name__ == '__main__':
    app.run()
