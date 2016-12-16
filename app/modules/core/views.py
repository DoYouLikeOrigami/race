from flask import Blueprint, render_template, request, redirect, url_for
from .mail import send_email

core = Blueprint('core', __name__, template_folder='templates')


@core.route('/')
def index():
	return render_template('index.jinja2')


@core.route('/get-maket', methods=['POST'])
def get_maket():
	data = request.get_json()
	send_email(subject='Запрос на макет на сайте medalinazakaz.ru', email=data['email'], name=data['name'], phone=data['phone'])
	return 'OK'


@core.route('/callback', methods=['POST'])
def callback():
	data = request.get_json()
	send_email(subject='Заказ обратного звонка на сайте medalinazakaz.ru', phone=data['phone'])
	return 'OK'


@core.route('/get-art', methods=['POST'])
def get_art():
	data = request.get_json()
	send_email(subject='Запрос на эскизы художника на сайте medalinazakaz.ru', email=data['email'])
	return 'OK'


@core.route('/get-commerce', methods=['POST'])
def get_commerce():
	data = request.get_json()
	send_email(subject='Запрос на коммерческое предложение на сайте medalinazakaz.ru', email=data['email'], phone=data['phone'])
	return 'OK'


@core.route('/get-contract', methods=['POST'])
def get_contract():
	data = request.get_json()
	send_email(subject='Запрос на шаблон договора на сайте medalinazakaz.ru', email=data['email'])
	return 'OK'


@core.route('/send-mail', methods=['POST'])
def send_mail():
	data = request.get_json()
	send_email(subject='Письмо с сайта medalinazakaz.ru', email=data['email'], text=data['msg'])
	return 'OK'


@core.route('/thankyou')
def thankyou():
	return render_template('thankyou.jinja2')
