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
