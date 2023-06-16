from distutils.log import debug
from fileinput import filename
from flask import *  
import os
from flask_cors import CORS
import pickle 
import json 
from flask_pymongo import PyMongo


app = Flask(__name__)  
cors = CORS(app)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/data"
mongo = PyMongo(app)
db = mongo.db

@app.route('/')  
def main():  
    return render_template("Sandbox.html")  

@app.route('/interface')
def interface():
        return render_template("index.html")  

@app.route("/add_one")
def add_one():
    db.images.insert_one({'title': "todo title", 'body': "todo body"})
    return jsonify(message="success")

@app.route('/file/<filename>')
def file(filename):
    print(filename)
    return mongo.send_file(filename)

@app.route('/images/<userID>', methods = ['GET'])  
def images(userID):
    path = './static/customAssets/' + userID + "/"
    if os.path.exists(path):
        librarian = {}            
        images = []
        with open('./static/customAssets/' + userID + "/librarian.pkl", 'rb') as f:
            librarian = pickle.load(f)
        files  = os.listdir(path)
        for file in files:
            if file[-3:] == 'jpg' or  file[-3:] == 'png':
                print(librarian[file][1])
                images.append(["/static/customAssets/"+userID+"/"+file,librarian[file][0],librarian[file][1],librarian[file][2]])
        return images
    return []

@app.route('/models/<userID>', methods = ['GET'])  
def models(userID):
    path = './static/customAssets/' + userID + "/"
    if os.path.exists(path):     
        librarian = {}            
        models = []
        files  = os.listdir(path)
        with open('./static/customAssets/' + userID + "/librarian.pkl", 'rb') as f:
            librarian = pickle.load(f)
        for file in files:
            if file[-3:] == 'glb':
                models.append(["/static/customAssets/"+userID+"/"+file,librarian[file][0],librarian[file][1],librarian[file][2]])
        return models
    return []


@app.route('/upload', methods = ['POST'])  
def upload():
    if request.method == 'POST':
        id = request.form['userID']
        f = request.files['file']
        title = request.form['title']
        desc = request.form['desc']
        scale = request.form['scale']
        filename=f.filename.replace(" ", "")
        mongo.save_file("hello.txt",f)
        if os.path.exists('./static/customAssets/' + id ):  
            librarian = {}        
            f.save('./static/customAssets/' + id +"/" + filename)
            with open('./static/customAssets/' + id + "/librarian.pkl", 'rb') as f:
                librarian = pickle.load(f)
                librarian[filename] = [scale,title,desc]
            with open('./static/customAssets/' + id + "/librarian.pkl", 'wb') as f:
                pickle.dump(librarian, f)
                print(librarian)

        else:
            os.mkdir('./static/customAssets/' + id + "/")
            f.save('./static/customAssets/' + id +  "/" + f.filename.replace(" ", ""))
            librarian = {f.filename.replace(" ", ""):[scale,title,desc]}
            with open('./static/customAssets/' + id + "/librarian.pkl", 'wb+') as f:
                pickle.dump(librarian, f)
            print(librarian)
    return render_template("index.html")  


@app.route('/worlds/<userID>', methods = ['GET'])  
def worlds(userID):
    path = './static/customAssets/' + userID + "/"
    if os.path.exists(path):     
        worlds = []        
        files  = os.listdir(path)
        for file in files:
            if file[-4:] == 'json':
                worlds.append(file[:-5])
        return worlds
    return []


@app.route('/saveworld/<userID>/<worldName>', methods = ['POST'])  
def saveworld(userID,worldName):
    f = request.get_json()
    path = './static/customAssets/' + userID + "/"
    if os.path.exists(path):     
        with open('./static/customAssets/' + userID + '/'+ worldName +'.json', 'w') as outfile:
            json.dump(f, outfile)
    return render_template("index.html")  


@app.route('/loadworld/<userID>/<worldName>', methods = ['GET'])  
def loadworld(userID,worldName):
    with open('./static/customAssets/' + userID + "/" + worldName+ ".json", 'r') as f:
        world = json.load(f)
    return world

@app.route('/user/<userID>', methods = ['GET'])  
def user(userID):
    path = './static/customAssets/' + userID + "/"
    if os.path.exists(path):            
        images = []
        files  = os.listdir(path)
        for file in files:
            if file[-3:] == 'glb':
                images.append("https://192.168.20.162:5000/static/assets/"+userID+"/"+file)
    return images
    

if __name__ == '__main__':  
    app.run(debug=True)