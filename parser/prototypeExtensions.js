// STRING

if(!String.prototype.startsWith) {
    String.prototype.startsWith = function(term) {
      return this.substr(0, term.length) === term;
    };
}

if(!String.prototype.clean) {
    String.prototype.clean = function() {
        return this.trim().replace(/[\s\t]+/,' ')
    }
}

if(!String.prototype.isEmpty) {
    String.prototype.isEmpty = function(value) {
        if (this.length === 0) return true
        var cleanString = this.clean();
        return cleanString === '' || cleanString === ' '
    }
}

// ARRAY

Array.prototype.contains = function(obj) { return this.indexOf(obj) > -1 }

Array.prototype.topRef = function() { return this.length - 1 }

Array.prototype.top = function() { return this[this.length - 1] }
