from websocket import create_connection
import requests,datetime

url = 'http://ec2-3-143-218-119.us-east-2.compute.amazonaws.com:3000/orders'
myobj = {"stock":"TFOF11","target_value":15}

ws = create_connection("ws://ec2-3-144-182-171.us-east-2.compute.amazonaws.com:8080/ws?ticks=FSRF11")
print("Receiving...")
result =  ws.recv()
print("Received" ,result,datetime.datetime.now())
x = requests.post(url, data = myobj,headers={"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlc3R1ZGFudGUudWZjQHVmYy5jb20uYnIiLCJpYXQiOjE2MzI5NjMzOTl9.eoo0hzK0axLNZd-RK4fF1LJ62mPe2VRs91DMzuS7xVI"})
print(x,datetime.datetime.now())
ws.close()