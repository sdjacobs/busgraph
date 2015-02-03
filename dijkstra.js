d3.dijkstra = function () {
    var dijkstra = {}, nodes, edges, source, dispatch = d3.dispatch("start", "tick", "step", "end");
    
    var update = function(node) {
        node.links.forEach(function(link) {
            var tar = link.target;
            if (!tar.visited) {
                var dist = current.distance + link.value;
                tar.distance = Math.min(dist, tar.distance);
            }
        });
    };

    dijkstra.run = function (src) {
        source = src;
        var unvisited = new Heap(function(a, b) { return a.distance - b.distance });

        nodes.forEach(function (d) {
            if (d != src) {
                d.distance = Infinity;
                unvisited.push(d);
                d.visited = false;
            }
        });
      
        var current = src;
        current.distance = 0;

        var ti = 0;
        function tick() {
            current.visited = true;
        
            update(current, unvisited);

            if (unvisited.length == 0 || current.distance == Infinity) {
                dispatch.end()
                return true;
            }
           

            // no longer needed because we can updateItem
            //unvisited.heapify(); 

            current = unvisited.pop()

            if (ti > 100) {
              dispatch.tick();
              ti = 0;
            }
            
            ti += 1;
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
   
   dijkstra.update = function (_) {
       if (!arguments.length)
           return update;
       else {
           update = _;
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
