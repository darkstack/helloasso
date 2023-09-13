from sqlite3 import Connection
import json 
from flask.json.provider import DefaultJSONProvider


class CustomJSONProvider(DefaultJSONProvider):
    @staticmethod
    def default(obj) -> dict :
        if isinstance(obj,Payment):
            return obj.to_json()
        return DefaultJSONProvider.default(obj)

class Payment(json.JSONEncoder):
    id : int
    amount: float
    name : str 
    message : str
    def __init__(self,id,amount,name,message) -> None:
        self.id = id 
        self.amount = amount
        self.name = name 
        self.message = message

    def save(self, conn : Connection):
        try:
            conn.cursor()
            conn.execute("insert into orders values (:id,:amount,:message,:name)",
                        {
                            "id" : self.id,
                            "amount" : self.amount,
                            "message" : self.message,
                            "name" : self.name
                        })
            conn.commit()
        except: 
            print("Can't save?")

        return 
    def __repr__(self) -> str:
        return '{} - {}€- {}'.format(self.name,self.amount/100,self.message)
    def to_json(self) -> dict:
        return {
                "name":self.name,
                "amount": self.amount/100,
                "message": self.message
        }


class Client:
    def __init__(self,sock) -> None:
        self.sock = sock
    
    def send_event(self, data):
        print(self.sock)
        self.sock.send(data)
