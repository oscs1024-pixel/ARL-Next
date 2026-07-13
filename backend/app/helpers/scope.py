import bson
from app import utils
from app.utils.ip import ip_in_scope
from app.utils.domain import is_in_scopes


def check_target_in_scope(target, scope_data):
    from .task import get_ip_domain_list
    ip_list, domain_list = get_ip_domain_list(target)

    domain_array = scope_data.get("domain_array")
    ip_array = scope_data.get("ip_array")
    
    if domain_array is None or ip_array is None:
        st = scope_data.get("scope_type", "domain")
        sa = scope_data.get("scope_array", [])
        domain_array = sa if st == "domain" else []
        ip_array = sa if st == "ip" else []

    for ip in ip_list:
        if not ip_in_scope(ip, ip_array):
            raise Exception("{}不在范围{}中".format(ip, ",".join(ip_array)))

    for domain in domain_list:
        if not is_in_scopes(domain, domain_array):
            raise Exception("{}不在范围{}中".format(domain, ",".join(domain_array)))

    return ip_list, domain_list


def get_scope_by_scope_id(scope_id):
    query = {
        "_id": bson.ObjectId(scope_id)
    }
    data = utils.conn_db("asset_scope").find_one(query)
    return data


