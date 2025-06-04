# Mini AI Agent

这是一个简单的AI代理程序，可以执行基本的对话、等待和网络搜索功能。

## Features

目前实现了三个基础功能：
- 说话：能回应我们
- 等待：可以控制响应的时间
- 搜索：能帮我们在网上找资料（支持中英文）

## 安装步骤

需要：
- Python 3.x
- 安装包：`duckduckgo-search`

直接运行：
```bash
# 安装依赖
pip3 install duckduckgo-search

# 运行程序
python3 main.py
```

## Example

项目中的 `main.py` 包含了一个示例脚本，展示了所有可用的命令：

```python
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
```

## 自定义Script

你可以通过修改 `main.py` 中的 `script` 变量来创建自己的命令序列。例如：

```python
script = '''
SAY "让我们搜索一些有趣的话题"
SEARCH "Latest AI developments"
WAIT 1
SAY "搜索完成"
'''
```

## 注意事项

- 搜索功能使用 DuckDuckGo 搜索引擎
- 搜索可能会受到频率限制
- 支持中英文搜索，但英文搜索结果通常更稳定

## 项目结构

- `main.py`: 主程序入口和示例脚本
- `actions.py`: 定义了所有可用的命令实现
- `dsl.py`: 处理脚本解析的核心逻辑