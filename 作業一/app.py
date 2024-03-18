import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("127.0.0.1", 20213))
msg = b"This is a test from python client"

s.send(msg)
response = s.recv(1024)
print(response.decode('utf-8'))
s.close()