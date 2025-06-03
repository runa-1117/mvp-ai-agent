from dsl import parse_script
from actions import run_action

if __name__ == "__main__":
    print("Starting Mini AI Agent...\n")

    script = '''
    SAY "你好！我是一个迷你AI助手，我现在可以进行网络搜索了！"
    WAIT 1
    SAY "让我来搜索一下关于OpenAI的最新信息"
    SEARCH "OpenAI latest news and developments 2025"
    WAIT 2
    SAY "接下来让我们搜索一下中文内容"
    SEARCH "2025年人工智能发展最新动态"
    WAIT 1
    SAY "搜索演示完成！现在我可以帮您搜索任何感兴趣的话题"
    '''

    steps = parse_script(script)

    for step in steps:
        run_action(step)

    print("\n✅ Agent finished execution.")
