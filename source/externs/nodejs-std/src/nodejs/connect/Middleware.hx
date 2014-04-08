package nodejs.connect;

import js.Node;

typedef Middleware = ?NodeHttpServerReq -> ?NodeHttpServerResp -> ?Next -> Void;

typedef Next = Dynamic -> Void;