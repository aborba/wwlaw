Array.prototype.contains = function(obj) {return this.indexOf(obj) > -1 }

exports.isRoman = (value) => {
    if (!value) return false
    return (/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i).test(value)
}

exports.isNumeral = (value) => {
    if (!value) return false
    return (/\d+\.?[ºª]/).test(value)
}

exports.roman2arabic = (value) => {
	if (! value || ! exports.isRoman(value)) return
	var res = M = C = X = I = 0;
	for(ch of value) switch (ch.toUpperCase()) {
		case "M": M += 1000; res -= C; C = 0; break;
		case "D": res += M + 500 - C; M = 0; C = 0; break;
		case "C": C += 100; res += M - X; M = 0; X = 0; I = 0; break;
		case "L": res += M + C + 50 - X; M = 0; C = 0; X = 0; I = 0; break;
		case "X": X += 10; res += M + C - I; M = 0; C = 0; I = 0; break;
		case "V": res += M + C + X + 5 - I; M = 0; C = 0; X = 0; I = 0; break;
		case "I": I += 1; res += M + C + X; M = 0; C = 0; X = 0; break;
		default: return 0;
	}
	return res + M + C + X + I;
}

exports.isOfType = (value, tokens, isType) => { // "Parte I", ["parte"], isRoman
if (! value || typeof value !== 'string') return false
var parts = value.clean().split(' ')
var tokensLc = typeof tokens === 'string' ? [(tokens.toLowerCase())] : tokens.map(function(val) {return val.toLowerCase(); });
return parts.length >= 2
    && tokensLc.contains(parts[0].toLowerCase())
    && isType(parts[1])
}