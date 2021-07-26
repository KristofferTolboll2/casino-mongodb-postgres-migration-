import { ENV } from "./main";
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
export enum Enviroment {
    DEVELOPMENT = "development",
    PRODUCTION = "production"
}


export const configureEnvironment = (env: string): Enviroment => {
    console.log(env)
    return Enviroment.PRODUCTION.valueOf() === env ? Enviroment.PRODUCTION : Enviroment.DEVELOPMENT;
}


/**
 * Databse configuration
 **/


