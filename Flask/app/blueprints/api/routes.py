from flask import jsonify, request
import os 
# import base64
# import requests
import openai
from app.blueprints.api import api
from app.blueprints.api.models import Characters, User
from app.blueprints.api.http_auth import basic_auth, token_auth
from sqlalchemy import select
openai.organization = "org-mrhmm4bXaDJPBe0S5mpDJDAm"
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.Model.list()
# engine_id = "stable-diffusion-v1-5"
# api_host = os.getenv('API_HOST', 'https://api.stability.ai')
# api_key = os.getenv("STABILITY_API_KEY")




# Login - Get Token with Username/Password in header
@api.route('/token', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    return jsonify({'token': token})


# Create a user
@api.route('/users', methods=['POST'])
def create_user():
    data = request.json
    # Validate the data
    for field in ['username', 'email', 'password']:
        if field not in data:
            return jsonify({'error': f"You are missing the {field} field"}), 400

    # Grab the data from the request body
    username = data['username']
    email = data['email']

    # Check if the username or email already exists
    user_exists = User.query.filter((User.username == username)|(User.email == email)).all()
    # if it is, return back to register
    if user_exists:
        return jsonify({'error': f"User with username {username} or email {email} already exists"}), 400

    # Create the new user
    # new_user = User(username=username, email=email, password=password)
    new_user = User(**data)

    return jsonify(new_user.to_dict())


# Update a user by id 
@api.route('/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def updated_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({'error': 'You do not have access to update this user'}), 403
    user = User.query.get_or_404(id)
    data = request.json
    user.update(data)
    return jsonify(user.to_dict())


# Delete a user by id
@api.route('/users/<int:id>', methods=['DELETE'])
@token_auth.login_required
def delete_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({'error': 'You do not have access to delete this user'}), 403
    user_to_delete = User.query.get_or_404(id)
    user_to_delete.delete()
    return jsonify({'success': f'{user_to_delete.username} has been deleted'})


# Get user info from token
@api.route('/me')
@token_auth.login_required
def me():
    return token_auth.current_user().to_dict()


# Create a character
@api.route('/characters', methods=['POST'])
@token_auth.login_required
def create_character(): 
    print("hi")
    if not request.is_json:
        return jsonify({'error': 'Please send a body'}), 400
    data = request.json
    # Validate the data
    for field in ['name', 'link', 'strength', 'agility', 'intellegence', 'speed', 'endurance', 'camoflague', 'health']:
        if field not in data:
            return jsonify({'error': f"You are missing the {field} field"}), 400
    current_user = token_auth.current_user()
#     if api_key is None:
#         raise Exception("Missing Stability API key.")
#     response2 = requests.post(
#         f"{api_host}/v1/generation/{engine_id}/text-to-image",
#         headers={
#         "Content-Type": "application/json",
#         "Accept": "application/json",
#         "Authorization": f"Bearer {api_key}"
#         },
#         json={
#         "text_prompts": [
#             {
#                 "text": data['link'] 
#             }
#         ], 
#         "cfg_scale": 7,
#         "clip_guidance_preset": "FAST_BLUE",
#         "height": 512,
#         "width": 512,
#         "samples": 1,
#         "steps": 30,
#     },
# )

#     if response2.status_code != 200:
#         raise Exception("Non-200 response: " + str(response2.text))

#     data2 = response2.json()
#     print(data2["artifacts"][0]["finishReason"])
#     for i, image in enumerate(data2["artifacts"]):
#          with open(f"./out/v1_txt2img_{i}.png", "wb") as f:
#              f.write(base64.b64decode(image["base64"]))
    response1 = openai.Image.create(
    prompt= data['link'],
    n=1,
    size="1024x1024"
    )
    data['link'] = response1['data'][0]['url']
    data['user_id'] = current_user.id
    new_character = Characters(**data)
    return jsonify(new_character.to_dict()), 201
   


# Get all characters
@api.route('/characters1')
def get_characters():
    characters = Characters.query.all()
    return jsonify([c.to_dict() for c in characters])


# Get a single character with id
@api.route('/characters/<int:character_id>')
def get_character(character_id):
    character = Characters.query.get_or_404(character_id)
    return jsonify(character.to_dict())


# Update a single character with id
@api.route('/characters/<int:character_id>', methods=['PUT'])
@token_auth.login_required
def update_character(character_id):
    character = Characters.query.get_or_404(character_id)
    user = token_auth.current_user()
    if user.id != character.user_id:
        return jsonify({'error': 'You are not allowed to edit this character'}), 403
    data = request.json
    character.update(data)
    return jsonify(character.to_dict())

# Get champion
@api.route('/champ')
def get_champ():
    results = select(Characters).where(Characters.champion == True)
    character = results.query
    return character


# Delete a single character with id
@api.route('/characters/<int:character_id>', methods=['DELETE'])
@token_auth.login_required
def delete_character(character_id):
    character = Characters.query.get_or_404(character_id)
    user = token_auth.current_user()
    if user.id != character.user_id:
        return jsonify({'error': 'You are not allowed to edit this character'}), 403
    character.delete()
    return jsonify({'success': f'{character.title} has been deleted'})
