d3.dijkstra = function () {
    var dijkstra = {}, nodes, edges, source, dispatch = d3.dispatch("start", "tick", "step", "end");
    
    dijkstra.run = function (src) {
        source = src;
        var unvisited = [];

        nodes.forEach(function (d) {
            if (d != src) {
                d.distance = Infinity;
                unvisited.push(d);
                d.visited = false;
            }
        });
      
        var current = src;
        current.distance = 0;

        function tick() {
            current.visited = true;
            current.links.forEach(function(link) {
                var tar = link.target;
                if (!tar.visited) {
                    var dist = current.distance + link.value;
                    tar.distance = Math.min(dist, tar.distance);
                }
            });
            if (unvisited.length == 0) {
                dispatch.end()
                return true;
            }
            unvisited.sort(function(a, b) {
                return b.distance - a.distance 
            });

            current = unvisited.pop()

            dispatch.tick();
            if (current.distance == Infinity) {
                dispatch.end()
                return true;
            }
            return false;
        }

        d3.timer(tick);
    };
    
   dijkstra.nodes = function (_) {
        if (!arguments.length)
            return nodes;
        else {
            nodes = _;
            return dijkstra;
        }
    };
   
   dijkstra.edges = function (_) {
        if (!arguments.length)
            return edges;
        else {
            edges = _;
            return dijkstra;
        }
    };

   dijkstra.source = function(_) {
        if (!arguments.length)
            return source;
        else {
            source = _;
            return dijkstra;
        }
    };

    
   dispatch.on("start.code", dijkstra.run);
   
   return d3.rebind(dijkstra, dispatch, "on", "end", "start", "tick");
};
