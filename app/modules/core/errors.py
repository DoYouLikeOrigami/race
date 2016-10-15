from flask import Blueprint, render_template

error = Blueprint('error', __name__)


@error.app_errorhandler(404)
def page_not_found(error):
    return render_template('errors/404.jinja2', error=error), 404


@error.app_errorhandler(405)
def method_not_allowed(error):
    return render_template('errors/405.jinja2', error=error), 405


@error.app_errorhandler(500)
def internal_server(error):
    return render_template('errors/500.jinja2', error=error), 500
