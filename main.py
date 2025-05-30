from dsl import task
from actions import browse

@task("get_titles")
def run():
    result = browse("https://news.ycombinator.com", "a.storylink", as_name="titles")
    print(f"\n✅ 抓取成功！共 {len(result['titles'])} 条内容：")
    for i, title in enumerate(result['titles'][:5]):
        print(f"{i+1}. {title}")
