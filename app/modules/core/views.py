from flask import Blueprint, render_template, request
from .mail import send_email

core = Blueprint('core', __name__, template_folder='templates')


@core.route('/')
def index():
    return render_template('index.jinja2')


@core.route('/order', methods=['POST'])
def order():
    data = request.get_json()
    send_email(subject='Заполнена заявка на сайте «ХочуКрутойСайт»',
               phone=data['tel'], text=data['hidden'])
    return 'OK'

@core.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.get_json()
    send_email(subject='Отправлено письмо с сайта «ХочуКрутойСайт»',
               email=data['mail'], name=data['name'], text=data['msg'])
    return 'OK'

@core.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    send_email(subject='Подписка на новости на сайте «ХочуКрутойСайт»',
               email=data['mail'])
    return 'OK'
