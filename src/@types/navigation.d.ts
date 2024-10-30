import { AppRoutes } from '@/routes/app.routes'

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {}
  }
}
