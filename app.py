from flask import Flask, render_template, url_for, request
from flask_mysqldb import MySQL
import datetime

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'Localhost'
app.config['MYSQL_DB'] = 'dictionary'
app.config['MYSQL_USER'] = 'ephrim'
app.config['MYSQL_PASSWORD'] = 'The1man@'

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    user_response = ''
    if request.method == 'POST':
        user_response = request.form['word']
        conn = mysql.connection
        cur = conn.cursor()
        cur.execute('select meaning from word where word=%s', (user_response,))
        rv = cur.fetchall()

        if rv:
            user_response = f"{user_response}: \n{rv[0][0]}"
        else:
            user_response = f" sorry \''{user_response}\'' meaning was not found"
    return render_template('index.html', user_response = user_response)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run(debug=True)
