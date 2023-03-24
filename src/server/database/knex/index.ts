import {knex} from 'knex';
import pg from 'pg';
import 'dotenv/config';

import {development, production, test} from './Environment';

const getEnvironment = () =>{
    switch (process.env.NODE_ENV) {
        case 'production':
            pg.types.setTypeParser(20, 'text', parseInt);
            return production;
        case 'test': return test;
        default: return development;
    }
}


export const Knex = knex(getEnvironment())