
goog.module('elide.runtime.js.entry');

function testExample() {
    const count = 26254.39;
    const date = new Date("2012-05-24");

    /**
     * @param {!string} locale Locale to render for
     * @return {!string} rendered string
     */
    function log(locale) {
        return `${new Intl.DateTimeFormat(locale).format(date)} ${new Intl.NumberFormat(locale).format(count)}`;
    }

    log("en-US"); // 5/24/2012 26,254.39

    return log("de-DE"); // 24.5.2012 26.254,39
}

testExample();
