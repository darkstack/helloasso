#!/bin/env python3
import os
from re import A
import sqlite3
from flask import Flask, make_response, render_template,request,g,jsonify
from flask_sock import Sock
from classes import Payment, Client,Donator, CustomJSONProvider
import random
from flask_cors import CORS,cross_origin



clients_list = []
payments_list : list[Payment] =  []

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path,'db.sqlite')
)
app.json = CustomJSONProvider(app)
sock = Sock(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def get_db():    
    db = getattr(g, '_database', None)
    if db is None: 
        db = g.db = sqlite3.connect('db.sqlite')
    return db

@app.teardown_appcontext
def close(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

def notify_client_payment(msg):
    for c in clients_list:
        try: 
            c.send_event(app.json.dumps(msg))
        except:
            clients_list.remove(c)

@app.route('/')
def index():
    return  render_template('index.html')

#@app.route('/show')
#def show(): 
#    db = get_db()
#    cur = db.cursor()
#    cur.execute('select * from orders;')
#    info = cur.fetchall();
#    val = "" 
#    for i in info:
#        val += '{} {} <br/>'.format(i[0],i[1])
#    return make_response(val, 200)

@app.route('/test')
def test():
    p = Payment(int(random.random()*100),5000,'TEST DE MESSAGE BIEN LONG SKLDJQLKDJQLKSJDQLSKJDQLKJD','Nom donation')
    p.save(get_db())
    notify_client_payment(p)
    return jsonify(p), 200

@app.route('/replay')
def replay():
    ps = Payment.get_all(get_db())
    print(ps)
    if ps:
        for p in ps:
            print(repr(p))
            notify_client_payment(p)
    return jsonify(ps), 200

@app.route('/last')
def last():
    print(len(clients_list))
    if(len(payments_list) > 0):
        p = payments_list[0]
        notify_client_payment(p)
    return make_response('last',200)

@sock.route('/notify')
def notify(sock):
    clients_list.append(Client(sock))
    while True:
        data = sock.receive()
        sock.send(data)

@app.route('/total')
@cross_origin()
def total():
    data= Payment.get_all(get_db())
    if data is not None: 
        total = sum(x.amount for x in data)
        return jsonify(float(total/100)), 200 
    else: 
        return jsonify(0);

@app.route('/topdonators')
@cross_origin()
def topdonator(): 
    data = Donator.top_donator(get_db())
    if data is not None: 
        return jsonify(data), 200
    else: 
        return jsonify(0);

@app.route('/notifications',methods=['POST'])
def notifications():
    if request.json is not None:
        print(request.json)
        if request.json['eventType'] == 'Order':
            name = ''
            message = '' 
            try:
                fields = request.json['data']['items'][0]['customFields']
                for f in fields:
                    if f['name'] == 'Message':
                        message = f['answer']
                    if f['name'] == 'Pseudo':
                        name = f['answer']
            except:
                print('Fail to parse');

            p = Payment(request.json['data']['id'],
                         request.json['data']['amount']['total'],
                         message,
                         name)
            p.save(get_db());
            payments_list.append(p)
            notify_client_payment(p)
        return make_response('OK',200)

    return make_response('Not Handled',400)
        
