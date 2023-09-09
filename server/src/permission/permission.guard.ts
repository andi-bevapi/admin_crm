import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/auth/auth.service";
import { RoleService } from "src/role/role.service";
import { UsersService } from "src/user/users.service";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly roleService: RoleService,
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const access = this.reflector.get<string>('access', context.getHandler());
        if (!access) {
            return true
        }
        const request = context.switchToHttp().getRequest();
        const id = await this.authService.authUserId(request);
        const user = await this.userService.findOne(id, ['role']);
        const role = await this.roleService.findOne(user.role.id, ['permissions']);


        console.log("access----", access);

        if (request.method === 'GET') {
            return role.permissions.some((el) => {
                (el.name === `view_${access}`) || (el.name === `edit_${access}`)
            });
        }

        return role.permissions.some((el) => {
            el.name === `edit_${access}`
        });

    }
} 