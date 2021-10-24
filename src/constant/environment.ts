export enum Environment {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    TEST = 'test'
}

/**
 * Environment 타입인지 확인
 *
 * @param {Environment} item 검사하고자 하는 item
 * @returns {boolean} Environment 타입 여부
 */
const isEnvironment = (item: unknown): item is Environment =>
    Object.values(Environment).includes(item as Environment);

export const currentEnvironment: Environment = isEnvironment(
    process.env.NODE_ENV
)
    ? process.env.NODE_ENV
    : Environment.PRODUCTION;
