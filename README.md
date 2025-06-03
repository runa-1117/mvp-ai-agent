# Mini AI Agent

一个简单的AI代理程序，可以执行基本的对话、等待和网络搜索功能。

## Features

- 支持基本的对话输出（SAY 命令）
- 可控的等待时间（WAIT 命令）
- 实时网络搜索功能（SEARCH 命令）
- 支持中英文搜索

## 安装步骤

1. 确保你的电脑已安装 Python 3.x
2. 安装必要的包：
   ```bash
   pip3 install duckduckgo-search
   ```

### Installation

1. 克隆此项目到本地
2. 在终端中进入项目目录
3. 运行主程序：
   ```bash
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

## 可用命令

1. `SAY "文本"` - 输出指定文本
2. `WAIT 秒数` - 等待指定的秒数
3. `SEARCH "关键词"` - 搜索指定的关键词并返回结果

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