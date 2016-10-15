from flask import Flask
from flask_resize import Resize
from flask_mail import Mail

from config import config

resize = Resize()
mail = Mail()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    resize.init_app(app)
    mail.init_app(app)

    from app.modules.core.views import core as main_blueprint
    app.register_blueprint(main_blueprint)

    from app.modules.core.errors import error as errors_blueprint
    app.register_blueprint(errors_blueprint)

    return app
