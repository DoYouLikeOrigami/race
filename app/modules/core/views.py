from flask import Blueprint, render_template, request, redirect, url_for
from .mail import send_email

core = Blueprint('core', __name__, template_folder='templates')


@core.route('/')
def index():
	return render_template('index.jinja2')


@core.route('/callback', methods=['POST'])
def callback():
	data = request.get_json()
	send_email(subject='Заказ обратного звонка на сайте предрейсовый-спб.рф', contact=data['contact'])
	return 'OK'


@core.route('/send-mail', methods=['POST'])
def send_mail():
	data = request.get_json()
	send_email(subject='Письмо с сайта предрейсовый-спб.рф', contact=data['contact'], text=data['msg'])
	return 'OK'


@core.route('/count', methods=['POST'])
def count():
	data = request.get_json()
	send_email(subject='Заказ на рассчёт стоимости с сайта предрейсовый-спб.рф', contact=data['contact'], watchTime=data['time'], number=data['number'])
	return 'OK'
