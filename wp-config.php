<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'web_soul');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'bc1abadba15b9f19bac2');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'de05c5e9aefad660c4ec3c9b58a859d89aa2d51f559c4725cafc666380d9b472');
define('SECURE_AUTH_KEY', 'a00ab1f36292626baa63b8d5e4881678464d1629ba2e1a0b05c145e0c78b274b');
define('LOGGED_IN_KEY', '4c7a055eb77d7fa202ffae5c01ea1913beba5a6f8d70d472261ac303742c8c52');
define('NONCE_KEY', '23e2413c6d38e798e81854d1a726fd1d2b0e9e0b9787ca73c0fa6d892f4ff892');
define('AUTH_SALT', '0d85001dde21bfdd03e1de40b3d1364ab5245f34c86bea75b6a9de26d62985d4');
define('SECURE_AUTH_SALT', 'b3f4998335049787f3a6185389b85a65c19fe15d28c9b22c6fb43f96cbb01a73');
define('LOGGED_IN_SALT', 'dc4817e03557d603b813777b92d5943817d325a92987d89f6b2994596aaa9852');
define('NONCE_SALT', 'c6004fe4e1f84b371439e4ce1c91f979bcc8586f983eb07909fc643643d155df');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'O8Q_';
define('WP_CRON_LOCK_TIMEOUT', 120);
define('AUTOSAVE_INTERVAL', 300);
define('WP_POST_REVISIONS', 5);
define('EMPTY_TRASH_DAYS', 7);
define('WP_AUTO_UPDATE_CORE', true);

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
