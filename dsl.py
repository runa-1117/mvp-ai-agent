from actions import browse

def task(name):
    def wrapper(func):
        print(f"\n🧠 开始任务: {name}")
        return func()
    return wrapper
