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
        conn = mysql.connection
        cur = conn.cursor()
        word = request.form['word']
        cur.execute('select meaning from word where word=%s', (word,))
        rv = cur.fetchall()
        print(rv)
        if rv:
            user_response = f"{word}: \n{rv[0][0]}"
        else:
            user_response = f" sorry \''{word}\'' meaning was not found"
    return render_template('index.html', user_response = user_response)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run(debug=True)
