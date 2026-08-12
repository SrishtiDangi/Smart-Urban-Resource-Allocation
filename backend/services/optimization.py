from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def create_data_model(bins_to_collect):
    """
    bins_to_collect is a list of dictionaries with 'id', 'weight_kg', and 'distance_matrix' 
    (distance from depot and to each other). For simplicity in this demo, we mock the distance matrix 
    if not provided.
    """
    data = {}
    # +1 for the depot (start/end location)
    num_locations = len(bins_to_collect) + 1
    
    # Mocking a distance matrix (symmetric) - in reality this comes from Google Maps / PostGIS
    # Distance between nodes in some arbitrary unit (e.g. minutes or km)
    data['distance_matrix'] = [[int(abs(i - j) * 2.5) for j in range(num_locations)] for i in range(num_locations)]
    
    # Mock weights (Demands) - Depot has 0 demand
    data['demands'] = [0] + [b.get('weight_kg', 10) for b in bins_to_collect]
    
    data['vehicle_capacities'] = [1000, 1000, 1000] # 3 Trucks, each can carry 1000kg
    data['num_vehicles'] = 3
    data['depot'] = 0
    return data

def optimize_routes(bins_to_collect):
    """
    Solves the Capacitated Vehicle Routing Problem (CVRP).
    """
    if not bins_to_collect:
        return {"error": "No bins provided for optimization"}
        
    data = create_data_model(bins_to_collect)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        # Returns the distance between the two nodes.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Capacity constraint.
    def demand_callback(from_index):
        # Returns the demand of the node.
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Capacity')

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.FromSeconds(1)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    if solution:
        return format_solution(data, manager, routing, solution, bins_to_collect)
    else:
        return {"error": "No solution found"}

def format_solution(data, manager, routing, solution, bins_to_collect):
    """Format the solution to return to the frontend."""
    total_distance = 0
    total_load = 0
    routes = []
    
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        route_distance = 0
        route_load = 0
        route_path = []
        
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data['demands'][node_index]
            
            # Map node_index back to original bin ID (Depot is 0)
            bin_id = "DEPOT" if node_index == 0 else bins_to_collect[node_index - 1].get('id', f"BIN-{node_index}")
            route_path.append({"bin_id": bin_id, "load_so_far": route_load})
            
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(previous_index, index, vehicle_id)
            
        node_index = manager.IndexToNode(index)
        route_path.append({"bin_id": "DEPOT", "load_so_far": route_load})
        
        routes.append({
            "truck_id": f"Truck-{vehicle_id + 1}",
            "route_distance": route_distance,
            "route_load_kg": route_load,
            "path": route_path
        })
        
        total_distance += route_distance
        total_load += route_load
        
    return {
        "status": "Optimization Successful",
        "total_distance": total_distance,
        "total_load_kg": total_load,
        "routes": routes
    }
