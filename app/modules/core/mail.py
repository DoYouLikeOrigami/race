from datetime import datetime
from threading import Thread
from flask import current_app, render_template
from flask_mail import Message
from app import mail


class AsyncEmail(object):
    @staticmethod
    def send(f):
        def wrapper(*args, **kwargs):
            thr = Thread(target=f, args=args, kwargs=kwargs)
            thr.start()
            thr.join()
        return wrapper


@AsyncEmail.send
def asynchronous_sending(message, app):
    with app:
        mail.send(message)


def send_email(subject=None, contact=None, watchTime=None, number=None, text=None):
    sender = 'Робот с сайта <' + current_app.config['MAIL_USERNAME'] + '>'
    time = datetime.now().ctime()
    recipients = ['doyoulikeorigami@gmail.com']
    message = Message(subject=subject, sender=sender, recipients=recipients,
                      charset='utf-8')
    message.html = render_template('message.jinja2', contact=contact,
                                   watchTime=watchTime, number=number, time=time,
                                   subject=subject, text=text)
    _ctx = current_app.app_context()
    asynchronous_sending(message=message, app=_ctx)
