from actions import run_action

def parse_script(script_text):
    steps = []
    for line in script_text.strip().splitlines():
        parts = line.strip().split(" ", 1)
        if not parts:
            continue
        command = parts[0].upper()
        argument = parts[1].strip('"') if len(parts) > 1 else ""
        steps.append({"action": command, "arg": argument})
    return steps
