#!/bin/env python3
import os
import sqlite3
from flask import Flask, make_response, render_template,request,jsonify,g 
from flask_sock import Sock
from classes import Payement, Client





clients_list = []
payements_list : list[Payement] =  []

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path,'db.sqlite')
)

sock = Sock(app)


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

@app.route('/')
def index():
    return  render_template('index.html')

@app.route('/show')
def show(): 
    db = get_db()
    cur = db.cursor()
    cur.execute('select * from orders;')
    info = cur.fetchall();
    val = "" 
    for i in info:
        val += '{} {} <br/>'.format(i[0],i[1])
    return make_response(val, 200)

@app.route('/test')
def test():
    p = Payement(1,5000,'TEST','TEST')
    for c in clients_list:
        try: 
            c.send_event(repr(p))
        except:
            clients_list.remove(c)
    return make_response('Test',200)

@app.route('/last')
def last():
    print(len(clients_list))
    if(len(payements_list) > 0):
        p = payements_list[0]
        for c in clients_list:
            try:
                c.send_event(repr(p))
            except: 
                clients_list.remove(c)
    return make_response('last',200)

@sock.route('/notify')
def notify(sock):
    clients_list.append(Client(sock))
    while True:
        data = sock.receive()
        sock.send(data)


@app.route('/notifications',methods=['POST'])
def notifications():
    if request.json is not None:
        print(request.json)
        if request.json['eventType'] == 'Order':
            p = Payement(request.json['data']['id'],
                         request.json['data']['amount']['total'],
                         request.json['data']['items'][0]['customFields'][0]['answer'],
                         request.json['data']['payer']['firstName'])
            p.save(get_db());
            payements_list.append(p)
            for c in clients_list:
                try:
                    c.send_event(repr(p))
                except: 
                    clients_list.remove(c)
        return make_response('OK',200)

    return make_response('Not Handled',400)
        
