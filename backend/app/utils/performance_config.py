from app.utils.conn import conn_db

def get_performance_config():
    doc = conn_db('system_config').find_one({"_id": "performance"})
    if not doc:
        return {"celery_heavy_concurrency": 2, "celery_light_concurrency": 2}
    return {
        "celery_heavy_concurrency": doc.get("celery_heavy_concurrency", 2),
        "celery_light_concurrency": doc.get("celery_light_concurrency", 2)
    }

def update_performance_config(celery_heavy_concurrency, celery_light_concurrency):
    conn_db('system_config').update_one(
        {"_id": "performance"}, 
        {"$set": {
            "celery_heavy_concurrency": celery_heavy_concurrency,
            "celery_light_concurrency": celery_light_concurrency
        }}, 
        upsert=True
    )
