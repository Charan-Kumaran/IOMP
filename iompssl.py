import time
import requests

def get_ssl_grade(domain):
    url = f"https://api.ssllabs.com/api/v3/analyze?host={domain}&fromCache=on&startNew=off"
    while True:
        response = requests.get(url).json()
        status = response.get("status")

        if status == "READY":
            grade = response["endpoints"][0].get("grade")
            return f"The SSL grade for {domain} is: {grade}"
        elif status == "ERROR":
            return "There was an error in retrieving the analysis."
        
        print("Analysis in progress, waiting for 10 seconds...")
        time.sleep(10)
print(get_ssl_grade("student.kmit.in"))        
