from sqlite3 import Connection
import json 
from flask.json.provider import DefaultJSONProvider


class CustomJSONProvider(DefaultJSONProvider):
    @staticmethod
    def default(obj) -> dict :
        if isinstance(obj,Payment):
            return obj.to_json()
        
        if isinstance(obj,Donator):
            return obj.to_json()
        return DefaultJSONProvider.default(obj)


class Donator(json.JSONEncoder):
    name : str
    amount : float 

    @staticmethod
    def top_donator(conn: Connection): 
        cur = conn.cursor()
        cur.execute("""select name, sum(amount) from orders
                       group by name
                       order by sum(amount) desc
                       LIMIT 5
                    """)
        data = cur.fetchall();
        print(data);
        if data is not None : 
            return [Donator(p[0],p[1]) for p in data]
        else:
            return None

    def __init__(self,name,amount) -> None:
        self.name = name 
        self.amount = float(amount/100)

    def to_json(self) -> dict : 
        return { "name" : self.name, 
                "amount": self.amount 
        } 

class Payment(json.JSONEncoder):
    id : int
    id_hello : int 
    amount: float
    name : str 
    message : str
    def __init__(self,id,amount,message,name) -> None:
        self.id_hello = id 
        self.amount = amount
        self.name = name 
        self.message = message

    def save(self, conn : Connection):
        try:
            conn.cursor()
            conn.execute("insert into orders (id_hello,amount,message,name) values (:id_hello,:amount,:message,:name)",
                        {
                            "id_hello" : self.id_hello,
                            "amount" : self.amount,
                            "message" : self.message,
                            "name" : self.name
                        })
            conn.commit()
        except: 
            print("Can't save?")

        return 

    @staticmethod 
    def get_all(conn: Connection):
        cur = conn.cursor()
        cur.execute("select id,id_hello,amount,message,name from orders")
        data = cur.fetchall()
        if data is not None:
            return [Payment(p[1],p[2],p[3],p[4]) for p in data]
        return None


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
