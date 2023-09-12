#!/bin/env python3
from flask import Flask, make_response, render_template,request,jsonify
from flask_sock import Sock

app = Flask(__name__)
sock = Sock(app)



class Payement:
    amount: float
    name : str 
    message : str
    def __init__(self,amount,name,message) -> None:
        self.amount = amount
        self.name = name 
        self.message = message

    def save():
        return 
    def __repr__(self) -> str:
        return '{} - {}€- {}'.format(self.name,self.amount/100,self.message)

class Client:
    def __init__(self,sock) -> None:
        self.sock = sock
    
    def send_event(self, data):
        print(self.sock)
        self.sock.send(data)

clients_list = []
payements_list : list[Payement] =  []
@app.route('/')
def index():
    return  render_template('index.html')

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
            p = Payement(request.json['data']['amount']['total'],
                         request.json['data']['items'][0]['customFields'][0]['answer'],
                         request.json['data']['payer']['firstName'])
            payements_list.append(p)
            for c in clients_list:
                try:
                    c.send_event(repr(p))
                except: 
                    clients_list.remove(c)
        return make_response('OK',200)

    return make_response('Not Handled',400)
        
