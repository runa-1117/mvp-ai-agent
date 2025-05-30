from bs4 import BeautifulSoup
import requests

def browse(url, selector, as_name="result"):
    print(f"🔍 正在访问: {url}")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    items = soup.select(selector)
    results = [item.text.strip() for item in items]
    return {as_name: results}
