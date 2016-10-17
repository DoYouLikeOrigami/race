from app import create_app

application = create_app('dev')

if __name__ == '__main__':
    application.run(host='0', port=4444, debug=True)
