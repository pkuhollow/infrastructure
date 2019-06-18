export function get_json(res) {
    if(!res.ok) throw Error(`网络错误 ${res.status} ${res.statusText}`);
    return res.json();
}

