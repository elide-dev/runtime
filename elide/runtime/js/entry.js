/*global goog*/

goog.module('elide.runtime.js.entry');
goog.require('elide.runtime.js.console');

goog.scope(() => {
    const console = goog.module.get('elide.runtime.js.console').console;

    function testExample() {
        const count = 26254.39;
        const date = new Date("2012-05-24");

        /**
         * @param {!string} locale Locale to render for
         * @return {!string} rendered string
         */
        function log(locale) {
            const formatted = (
                `${new Intl.DateTimeFormat(locale).format(date)} ${new Intl.NumberFormat(locale).format(count)}`
            );
            console.info("formatted", formatted);
            return formatted;
        }

        log("en-US"); // 5/24/2012 26,254.39

        return log("de-DE"); // 24.5.2012 26.254,39
    }

    testExample();
});
