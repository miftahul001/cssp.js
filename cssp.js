	function parseCss1(str) {
		var buf ='',
		ln = str.length,
		comments = 0,
		blocklv = 0,
		selector = '',
		res=[];
		for(var i=0; i<ln; i++) {
			
			if (comments == 0) {
				if (str[i]=='/') {
					comments = 1;
				}
			}
			else if (comments == 1){
				if (str[i]=='*') {
					comments = 2;
				}
				else {
					buf += '/';
					comments = 0;
				}
			}
			else if (comments == 2){
				if (str[i]=='*') {
					comments = 3;
				}
			}
			else if (comments == 3){
				if (str[i]=='/') {
					comments = 0;
				}
				else {
					comments = 2;
				}
				continue;
			}
			
			if (comments>0) {
				continue;
			}
			
			if (blocklv > 0) {
				if (str[i]=='}') {
					blocklv -= 1;
					if (blocklv == 0) {
						res.push({selector:selector, value:buf});
						selector = ''
						buf = '';
					}
					else {
						buf += str[i];
					}
				}
				else {
					buf += str[i];
					if (str[i]=='{') {
						blocklv += 1;
					}
				}
			}
			else if (str[i]=='{') {
				blocklv += 1;
				selector = buf;
				buf = '';
			}
			else {
				buf += str[i];
			}
		}
		return res;
	}
	
	function parseCssAsString1(val) {
		var buf ='',
		ln = val.length;
		for(var i=0; i<ln; i++) {
			buf += val[i].selector + ' : ' + val[i].value + ' <br> ';
		}
		return buf;
	}
	
