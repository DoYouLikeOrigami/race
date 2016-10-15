from flask_script import Manager, Shell

from app import create_app

CONFIG_NAME = 'dev'

app = create_app(CONFIG_NAME)
manager = Manager(app)


def create_shell_context():
    return dict(app=app)


manager.add_command('shell', Shell(make_context=create_shell_context))

if __name__ == '__main__':
    manager.run()
