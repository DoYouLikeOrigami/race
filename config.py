import os

BASE_PATH = os.path.join(os.path.dirname(__file__), 'app/static')
SAVE_PATH = os.path.join(os.path.dirname(__file__), 'app/static/img')


class BaseConfig():
    NEWS_PER_PAGE = 10
    ITEM_PER_PAGE = 15
    WTF_CSRF_ENABLED = True
    RESIZE_ROOT = SAVE_PATH
    RESIZE_URL = 'img'
    RESIZE_CACHE_DIR = 'cache'
    RESIZE_HASH_METHOD = 'md5'

    MAIL_SERVER = 'smtp.yandex.ru'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'no-reply@jokerinteractive.ru'
    MAIL_PASSWORD = '12345678'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    DEV_SECRET_KEY = 'y5g@kxp^jz@mamip$$e=b160k5ru&+b7&dm2_xpd+f6ahaqt&'
    SECRET_KEY = os.getenv('SECRET_KEY', DEV_SECRET_KEY)


class TestingConfig(DevelopmentConfig):
    TESTING = True


class ProductionConfig(BaseConfig):
    PRODUCTION_SECRET_KEY = 'y5g@kxp^jz@mamip#$%!@160k5ru&+b7&dm2_xpd+f6ahaqt&'
    SECRET_KEY = os.getenv('SECRET_KEY', PRODUCTION_SECRET_KEY)


config = {
    'dev': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
