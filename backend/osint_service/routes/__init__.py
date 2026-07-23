# -*- coding: utf-8 -*-
"""
路由模块
"""
from aiohttp import web


def setup_routes(app):
    """设置所有路由"""
    from .query_routes import setup_query_routes

    setup_query_routes(app)
    from .recon_routes import setup_recon_routes
    setup_recon_routes(app)
