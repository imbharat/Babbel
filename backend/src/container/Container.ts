import "reflect-metadata";
import { container } from "tsyringe";

import BaseData from "../data/BaseData";
import UserData from "../data/UserData";

import BaseService from "../services/BaseService";
import UserService from "../services/UserService";

import { IBaseDataProivder } from "../data/interfaces/IBaseData";
import { IUserDataProivder } from "../data/interfaces/IUserData";

import { IBaseServiceProivder } from "../services/interfaces/IBaseService";
import { IUserServiceProivder } from "../services/interfaces/IUserService";
import CacheService, {
  CacheServiceProvider,
} from "../cache-manager/CacheService";

/* DAL Registration */
container.register(IBaseDataProivder, {
  useClass: BaseData,
});
container.register(IUserDataProivder, {
  useClass: UserData,
});
/* End */

/* Service Registration */
container.register(IBaseServiceProivder, {
  useClass: BaseService,
});
container.register(IUserServiceProivder, {
  useClass: UserService,
});
container.register(CacheServiceProvider, {
  useClass: CacheService,
});
/* End */

export default container;
