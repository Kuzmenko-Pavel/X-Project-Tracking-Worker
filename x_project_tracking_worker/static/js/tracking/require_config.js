/**
 * Created by user on 05.07.16.
 */
require.config({
    paths: {
        underscore: './underscore'
    },
    shim: {
        underscore: {
            exports: '_'
        }
    },
    deps: [
        'underscore'
    ]
});