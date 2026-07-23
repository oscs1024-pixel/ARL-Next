from aiohttp import web
import asyncio
import logging

logger = logging.getLogger(__name__)

background_tasks = set()

async def start_recon(request):
    try:
        data = await request.json()
        task_id = data.get("task_id")
        if not task_id:
            return web.json_response({"code": 400, "msg": "Missing task_id"})
        from clients.job_runner import run_recon_job
        task = asyncio.create_task(run_recon_job(data))
        background_tasks.add(task)
        
        def handle_task_result(t):
            background_tasks.discard(t)
            try:
                t.result()
            except Exception as e:
                logger.error(f"Background task crashed: {e}", exc_info=True)
                
        task.add_done_callback(handle_task_result)
        return web.json_response({"code": 200, "msg": "Task accepted", "task_id": task_id})
    except Exception as e:
        return web.json_response({"code": 500, "msg": str(e)})

def setup_recon_routes(app):
    app.router.add_post("/api/v1/recon/start", start_recon)
