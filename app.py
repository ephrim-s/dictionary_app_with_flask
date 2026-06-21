from flask import Flask, render_template, url_for, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import json
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
        cur = conn.cursor(MySQLdb.cursors.DictCursor)
        cur.execute('select meaning from word where word=%s', (user_response,))
        rv = cur.fetchone()
        print(rv)

        if rv:
            user_response = f"{user_response}: \n{rv['meaning']}"
        else:
            user_response = f" sorry \''{user_response}\'' meaning was not found"
    return render_template('index.html', user_response = user_response)

@app.route('/dashboard')
def dashboard():
    conn = mysql.connection
    cur = conn.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('select * from word')
    rv = cur.fetchall()   

    return render_template('dashboard.html', words=rv)


@app.route('/word', methods=['POST'])
def add_word():
    req = request.get_json(silent=True)
    if not req:
        return jsonify({'error': 'Expected JSON body'}), 415

    word = req['word']
    meaning = req['meaning']
    conn = mysql.connection
    cur = conn.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('insert into word(word, meaning) values(%s, %s)', (word, meaning))
    conn.commit()
    cur.close()

    return jsonify({'status': 'success'}) 

@app.route('/word/<id>/delete', methods=['POST'])
def delete_word(id):
    word_id = id    
    conn = mysql.connection
    cur = conn.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('delete from word where id=%s', (word_id,))
    conn.commit()
    cur.close()

    return jsonify({'status': 'success'}) 
    
@app.route('/word/<id>/edit', methods=['POST'])
def edit_word(id):
    req = request.get_json(silent=True)
    if not req:
        return jsonify({'error': 'Expected JSON body'}), 415   
   
    word_id = id    
    word = req['word']
    meaning = req['meaning']
    conn = mysql.connection
    cur = conn.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('update word set word=%s, meaning=%s where id=%s', (word, meaning, word_id,))
    conn.commit()
    cur.close()

    return jsonify({'status': 'success'})     


if __name__ == '__main__':
    app.run(debug=True)
