// eslint-disable-next-line no-undef
module.exports = {
    changelogCollectionName: 'migrations_changelog',
    migrationFileExtension: '.js',
    migrationsDir: 'migrations',
    moduleSystem: 'commonjs',
    mongodb: {
        // eslint-disable-next-line no-undefined,no-undef
        databaseName: process.env.MONGODB_DB || undefined,
        // eslint-disable-next-line no-undef
        url: process.env.MONGODB_URI,
    },
    useFileHash: true,
};
