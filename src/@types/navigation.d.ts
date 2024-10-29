import { AppRoutes } from '@/routes/app.routes'
import { AuthRoutes } from '@/routes/auth.routes'

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes, AppRoutes {}
  }
}
