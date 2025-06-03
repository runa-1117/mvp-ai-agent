import time
from duckduckgo_search import DDGS

def say(text):
    print(f"[Agent says]: {text}")

def wait(seconds):
    print(f"[Agent waits]: {seconds} seconds...")
    time.sleep(float(seconds))

def search(query):
    print(f"[Agent searches]: {query}")
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=2))
            if results:
                search_results = []
                for result in results:
                    search_results.append(result['body'])
                final_result = " ".join(search_results)
                print(f"[Search result]: {final_result}")
                return final_result
            else:
                no_result = "Sorry, no results found."
                print(f"[Search result]: {no_result}")
                return no_result
    except Exception as e:
        error_msg = f"Search failed: {str(e)}"
        print(f"[Search error]: {error_msg}")
        return error_msg

def run_action(action_dict):
    action = action_dict["action"]
    arg = action_dict["arg"]
    if action == "SAY":
        say(arg)
    elif action == "WAIT":
        wait(arg)
    elif action == "SEARCH":
        search(arg)
    else:
        print(f"[Unknown action]: {action}")
