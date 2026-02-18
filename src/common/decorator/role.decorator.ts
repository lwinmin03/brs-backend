import { SetMetadata } from "@nestjs/common"
import { role } from "../enum/role.enum"

export const ROLE_KEY='role'
export const Role=(...role:role[])=>SetMetadata(ROLE_KEY,role)