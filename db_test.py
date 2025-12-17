import psycopg2
import sys

# User provided URL
DSN = "postgresql://mus1215:Jace_Wing159159@janghanju-server.asuscomm.com:5432/postgres/oneweek"

print(f"--- [STEP 1] URL 연결 시도: {DSN} ---")
try:
    conn = psycopg2.connect(DSN)
    conn.autocommit = True
    cur = conn.cursor()
    print("✅ [성공] DB 연결됨!")
    
    cur.execute("SELECT current_database(), current_schema();")
    print(f"✅ [정보] 현재 DB/Schema: {cur.fetchone()}")
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"❌ [실패] 에러 발생:\n{e}")

print("--- [종료] ---")
