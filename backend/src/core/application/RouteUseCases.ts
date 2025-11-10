import type { IRouteRepository } from '../ports/RouteRepository';
import type { Route } from '../domain/route';

export class RouteUseCases {
  constructor(private routeRepository: IRouteRepository) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.routeRepository.getAllRoutes();
  }
}