package js.node;

typedef FacebookUser = {
	var id :String;
	var name :String;
	var first_name :String;
	var middle_name :String;
	var last_name :String;
	var link :String;
	var username :String;
	var gender :String;
	var email :String;
	var timezone :String;
	var locale :String;
	var verified :String;
	var updated_time :String;
}

typedef FacebookAuthSession = {
	var user :FacebookUser;
	var accessToken :String;
}

typedef GoogleUser = {
	var id :String;
}

typedef GoogleAuthSession = {
	var user :GoogleUser;
	var accessToken :String;
}

typedef AuthSession = {
	var facebook :FacebookAuthSession;
	var google :GoogleAuthSession;
	var loggedIn :Bool;
}

typedef Cookie = {
	var originalMaxAge :String;
	var expires :String;
	var httpOnly :Bool;
	var path :String;
}

typedef Session = {
	var lastAccess :String;
	var cookie :Cookie;
	var auth :AuthSession;
	var params :Dynamic;
}

