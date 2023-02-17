import os, sys
import psycopg2

# Подключение к базе данных
con = psycopg2.connect(
  database="imagework", 
  user="postgres", 
  password="postgres", 
  host="localhost", 
  port="5432"
)

file_stats = os.stat(sys.argv[1])

try:
   cursor = con.cursor() 
   cursor.execute('INSERT INTO "documents" ("path", "size", "double_size") VALUES(%s, %s, %s);',(sys.argv[1], file_stats.st_size, file_stats.st_size * 2))
   con.commit()
   con.close()
except Exception as err:
   print ("Oops! An exception has occured:", err)