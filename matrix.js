// create matrix of size n filled with v
var matrix = function (n, m, v) {
    
    if (v instanceof Array)
        var _data = v.slice(0);
    else {
        var _data = new Array(n*m);
        for (var i = 0; i < n; i++)
            for (var j = 0; j < m; j++)
                _data[i*m+j] = v;
        }

    function value(i, j, v) {
        if (v)
            _data[i * m + j] = v;
        else
            return _data[i * m + j];
    }

    value.data = (function(_) {
        if(_)
            _data = _;
        else
            return _data;
    })

    value.clone = function() {
        return matrix(n, m, _data);
    }

    value.size = function() {
        return [n,m];
    }


    /* Return a new matrix with the minimum in each row */
    value.min = function() {
        var mm = new Array(n);
        for (var i = 0; i < n; i++) {
            var min = Infinity;
            for (var j = 0; j < m; j++) {
                if (_data[i*m+j] < min)
                    min = _data[i*m+j];
            }
            mm[i] = min;
        }
        return matrix(n, 1, mm);
    }


    /* 
     * Perhaps make this polymorphic.
     * The following functions are intended to mimic R slicing.
     * Goal: use a matrix like [1, 4, 6...] to index.
     */
    value.slice = function(I, J) {
      var ni = I.length;
      var nj = J.length;
      var data = new Array(ni * nj);
      I.forEach(function(i, ii) {
        J.forEach(function(j, jj) {
            data[ii*nj+jj] = _data[i*m+j];
        });
      });
      return matrix(ni, nj, data);
    }

    value.rnot = function(I) {
      var I_ = new Array(n - I.length);
      var i_ = 0, j = 0;
      /* i is in the index in the logical row, i_ is the index in the new row mask.
       * j is the index in the argument row mask. */
   
      for (var i = 0; i < n; i++) {
        if (I[j] == i) {
            j++
        } else {
          I_[i_] = i;
          i_++;
        }
      } 

      return I_;
    }

    return value;
}

