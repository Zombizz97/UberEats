// In this file you can configure migrate-mongo

const config = {
  mongodb: {
      options: {
          // eslint-disable-next-line no-inline-comments
          useNewUrlParser: true, // Removes a deprecation warning when connecting
          // eslint-disable-next-line no-inline-comments
          useUnifiedTopology: true, // Removes a deprecating warning when connecting
          //   ConnectTimeoutMS: 3600000, // increase connection timeout to 1 hour
          //   SocketTimeoutMS: 3600000, // increase socket timeout to 1 hour
      },
    url: "mongodb+srv://db_user:VnCqQsUQ2ApFL39s@ubereats.eklysgv.mongodb.net/",

  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    // eslint-disable-next-line sort-keys
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    // eslint-disable-next-line sort-keys
  changelogCollectionName: "changelog",

  // The mongodb collection where the lock will be created.
  lockCollectionName: "changelog_lock",

  // The value in seconds for the TTL index that will be used for the lock. Value of 0 will disable the feature.
  lockTtl: 0,

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // If the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  // Don't change this, unless you know what you're doing
    // eslint-disable-next-line sort-keys
  moduleSystem: 'commonjs',
};

// eslint-disable-next-line no-undef
module.exports = config;
