What you're seeing here is an implementation of [Dijktra's algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) in D3, running on data from the CTA. Dijkstra's algorithm is a way to iteratively discover the shortest paths in a graph, given a starting point. Click a node on the map to start Dijkstra's algorithm from that point. Colors expand outward as the algorithm explores the network of bus stops in the city, finding paths and updating them. Distance, in this case, means /time/: starting from my house at 8:00am on a weekday, where can I get to in the next hour?

# Data

The data comes from the CTA's General Transit Feed Specification, available [here](http://www.transitchicago.com/developers/gtfs.aspx):

- `stops.txt`: list of bus and train stops
- `stop_times.txt`: scheduled arrival times and departure times for every stop
- `routes.txt`: list of CTA routes
- `trips.txt`: list of CTA trips.

`routes.txt` and `trips.txt` are not strictly required for the algorithm; they just allow us to map trip IDs like "440081069971" to human-readable route names like "50 Damen".

Unedited, `stop_times.txt` has over 3 million entries and is 182 MB. This is just too big for a web app-style presentation, so 

# Algorithm

Each node on the map is a transit stop listed in `stops.txt`. A node's neighbors can be stops that are further along on route, or bus stops that are "walking distance." I'm using a crappy appoximation for the amount of time to walk somewhere -- we calculate the distance between two points, as the crow flies, and then say we can walk that at 2 mph. Stops are only walkable if they're within a mile of each other.

# More...

This project is built with [D3](https://d3js.org) and [heap](https://www.npmjs.com/package/heap), a Javascript priority queue implementation. It builds on my [d3-mapzoom](http://bl.ocks.org/sdjacobs/9ce5fadce234497dc592) plugin, and my experiments with D3 Dijkstra implementations [here](http://bl.ocks.org/sdjacobs/3900867adc06c7680d48) and [here](http://bl.ocks.org/sdjacobs/c2ee01307cdeceb19f9d).
